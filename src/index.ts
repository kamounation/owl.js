import express, { Application } from "express";
import { connect, set } from "mongoose";

import { MorganFactory } from "./morganConf";
import { ErrorFactory } from "./error";
import { Logger } from "./logger";

import { MongoParam, OwlRoute } from "./extras";

export class OwlFactory {
  public app: Application;
  public env: string;
  public port: string | number;
  private errorFactory: ErrorFactory;
  private morgan: MorganFactory;
  private logger: Logger;

  // Note: app wouold only work with mongodbfor now cause it's passed thrugh the cnstructor
  constructor(
    routes: OwlRoute[],
    nodeEnv: string,
    port?: number | string,
    mongo?: MongoParam
  ) {
    this.app = express();
    /**
     * @param nodeEnv can receive either  values of parameters "development" or "production"  or "test" but default is set to "development"
     */
    this.env = nodeEnv || "development";
    this.port = port || 8181;
    this.errorFactory = new ErrorFactory(nodeEnv);
    this.logger = new Logger(nodeEnv);
    this.morgan = new MorganFactory();

    this.initMongoDatabase(mongo.url, mongo.options);
    // TODO: pass array through this method to initialize middlewares from outside
    this.initMiddlewares();
    this.initRoutes(routes);
    this.ErrorHandling();
  }

  public Server() {
    return this.app;
  }

  // supports mongoose
  public initMongoDatabase(url: string, options: any) {
    // checks if the connection string is of mongodb
    const m_tring = url.split(":");
    if (m_tring[0] !== "mongodb") {
      throw new Error(
        "method: `initMongoDatabase` only works for mongodb's mongoose driver for this current version of owl.js. If you want to initialize another database then pass it to the 'initMiddlewares' method"
      );
    }

    if (this.env !== "production") {
      set("strictQuery", true);
    }
    // establish database connection
    // TODO: fix bug here
    const mongoRun = () => {
      try {
        const result = async () => await connect(url, options);
        if (result) {
          this.logger.logger.info("== MongoDb connected! ==");
        }
      } catch (error) {
        this.logger.logger.error(error);
      }
    };
    mongoRun();
  }

  public initMiddlewares() {
    if (this.env !== "test") {
      this.app.use(this.morgan.successHandler);
      this.app.use(this.morgan.errorHandler);
    }

    // parse json request body
    this.app.use(express.json());
    // parse urlencoded request body
    this.app.use(express.urlencoded({ extended: true }));
  }

  // map through all the routes and register them to the app
  private initRoutes(routes: OwlRoute[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private ErrorHandling() {
    // converts error to {ErrorRes}
    this.app.use(this.errorFactory.errorConverter);
    // handles actual error
    this.app.use(this.errorFactory.errorHandler);
  }

  public listen() {
    this.app.listen(this.port, () => {
      this.logger.logger.info(` === App running in ${this.env} mode ===`);
      this.logger.logger.info(`🚀 App listening on port ${this.port}`);
    });
  }
}
