"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorFactory = void 0;
const tslib_1 = require("tslib");
const http_status_1 = tslib_1.__importDefault(require("http-status"));
const logger_1 = require("./logger");
const errorHandler_1 = require("./errorHandler");
class ErrorFactory {
    constructor(nodeEnv) {
        this.nodeEnv = nodeEnv;
        this.logger = new logger_1.Logger(String(this.nodeEnv));
        this.errorConverter = (err, req, res, next) => {
            let error = err;
            if (!(error instanceof errorHandler_1.ErrorRes)) {
                const statusCode = error.statusCode
                    ? http_status_1.default.BAD_REQUEST
                    : http_status_1.default.INTERNAL_SERVER_ERROR;
                const message = error.message || http_status_1.default[statusCode];
                error = new errorHandler_1.ErrorRes(statusCode, message.toString(), false, err.stack);
            }
            next(error);
        };
        this.errorHandler = (err, req, res, next) => {
            let { statusCode, message } = err;
            if (this.nodeEnv === "production" && !err.isOperational) {
                statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
                message = String(http_status_1.default[http_status_1.default.INTERNAL_SERVER_ERROR]);
            }
            res.locals.errorMessage = err.message;
            const response = Object.assign({ code: statusCode, message }, (this.nodeEnv === "development" && { stack: err.stack }));
            if (this.nodeEnv === "development") {
                this.logger.logger.error(err);
            }
            res.status(statusCode).send(response);
        };
    }
}
exports.ErrorFactory = ErrorFactory;
//# sourceMappingURL=error.js.map