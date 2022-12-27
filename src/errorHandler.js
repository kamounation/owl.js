"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorRes = void 0;
class ErrorRes extends Error {
    constructor(statusCode, message, isOperational = true, stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.ErrorRes = ErrorRes;
//# sourceMappingURL=errorHandler.js.map