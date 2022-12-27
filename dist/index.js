"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OwlFactory", {
    enumerable: true,
    get: ()=>OwlFactory
});
const _express = _interopRequireDefault(require("express"));
const _mongoose = require("mongoose");
const _morganConf = require("./morganConf");
const _error = require("./error");
const _logger = require("./logger");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let OwlFactory = class OwlFactory {
    Server() {
        return this.app;
    }
    initMongoDatabase(url, options) {
        const m_tring = url.split(":");
        if (m_tring[0] !== "mongodb") {
            throw new Error("method: `initMongoDatabase` only works for mongodb's mongoose driver for this current version of owl.js. If you want to initialize another database then pass it to the 'initMiddlewares' method");
        }
        if (this.env !== "production") {
            (0, _mongoose.set)("strictQuery", true);
        }
        const mongoRun = ()=>{
            try {
                const result = async ()=>await (0, _mongoose.connect)(url, options);
                if (result) {
                    this.logger.logger.info("== MongoDb connected! ==");
                }
            } catch (error) {
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
        this.app.use(_express.default.json());
        this.app.use(_express.default.urlencoded({
            extended: true
        }));
    }
    initRoutes(routes) {
        routes.forEach((route)=>{
            this.app.use("/", route.router);
        });
    }
    ErrorHandling() {
        this.app.use(this.errorFactory.errorConverter);
        this.app.use(this.errorFactory.errorHandler);
    }
    listen() {
        this.app.listen(this.port, ()=>{
            this.logger.logger.info(` === App running in ${this.env} mode ===`);
            this.logger.logger.info(`🚀 App listening on port ${this.port}`);
        });
    }
    constructor(routes, nodeEnv, port, mongo){
        this.app = (0, _express.default)();
        this.env = nodeEnv || "development";
        this.port = port || 8181;
        this.errorFactory = new _error.ErrorFactory(nodeEnv);
        this.logger = new _logger.Logger(nodeEnv);
        this.morgan = new _morganConf.MorganFactory();
        this.initMongoDatabase(mongo.url, mongo.options);
        this.initMiddlewares();
        this.initRoutes(routes);
        this.ErrorHandling();
    }
};

//# sourceMappingURL=index.js.map