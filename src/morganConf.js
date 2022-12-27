"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MorganFactory = void 0;
const tslib_1 = require("tslib");
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const logger_1 = require("./logger");
const logger = new logger_1.Logger("developement");
morgan_1.default.token("message", (req, res) => res.locals.errorMessage || "");
class MorganFactory {
    constructor() {
        this.getIpFormat = () => logger.config === "production" ? ":remote-addr - " : "";
        this.successResponseFormat = `${this.getIpFormat()}:method :url :status - :response-time ms`;
        this.errorResponseFormat = `${this.getIpFormat()}:method :url :status - :response-time ms - message: :message`;
        this.successHandler = (0, morgan_1.default)(this.successResponseFormat, {
            skip: (req, res) => res.statusCode >= 400,
            stream: { write: (message) => logger.logger.info(message.trim()) },
        });
        this.errorHandler = (0, morgan_1.default)(this.errorResponseFormat, {
            skip: (req, res) => res.statusCode < 400,
            stream: { write: (message) => logger.logger.error(message.trim()) },
        });
    }
}
exports.MorganFactory = MorganFactory;
//# sourceMappingURL=morganConf.js.map