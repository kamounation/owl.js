"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwlFactory = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const mongoose_1 = require("mongoose");
const morganConf_1 = require("./src/morganConf");
const error_1 = require("./src/error");
const logger_1 = require("./src/logger");
class OwlFactory {
    constructor(routes, nodeEnv, port, mongo) {
        this.app = (0, express_1.default)();
        this.env = nodeEnv || "development";
        this.port = port || 8181;
        this.errorFactory = new error_1.ErrorFactory(nodeEnv);
        this.logger = new logger_1.Logger(nodeEnv);
        this.morgan = new morganConf_1.MorganFactory();
        this.initMongoDatabase(mongo.url, mongo.options);
        this.initMiddlewares();
        this.initRoutes(routes);
        this.ErrorHandling();
    }
    Server() {
        return this.app;
    }
    initMongoDatabase(url, options) {
        const m_tring = url.split(":");
        if (m_tring[0] !== "mongodb") {
            throw new Error("method: `initMongoDatabase` only works for mongodb's mongoose driver for this current version of owl.js. If you want to initialize another database then pass it to the 'initMiddlewares' method");
        }
        if (this.env !== "production") {
            (0, mongoose_1.set)("strictQuery", true);
        }
        const mongoRun = () => {
            try {
                const result = async () => await (0, mongoose_1.connect)(url, options);
                if (result) {
                    this.logger.logger.info("== MongoDb connected! ==");
                }
            }
            catch (error) {
                this.logger.logger.error(error);
            }
        };
        mongoRun();
    }
    initMiddlewares() {
        if (this.env !== "test") {
            this.app.use(this.morgan.successHandler);
            this.app.use(this.morgan.errorHandler);
        }
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    initRoutes(routes) {
        routes.forEach((route) => {
            this.app.use("/", route.router);
        });
    }
    ErrorHandling() {
        this.app.use(this.errorFactory.errorConverter);
        this.app.use(this.errorFactory.errorHandler);
    }
    listen() {
        this.app.listen(this.port, () => {
            this.logger.logger.info(` === App running in ${this.env} mode ===`);
            this.logger.logger.info(`🚀 App listening on port ${this.port}`);
        });
    }
}
exports.OwlFactory = OwlFactory;
//# sourceMappingURL=index.js.map