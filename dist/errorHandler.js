"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ErrorRes", {
    enumerable: true,
    get: ()=>ErrorRes
});
let ErrorRes = class ErrorRes extends Error {
    constructor(statusCode, message, isOperational = true, stack = ""){
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
};

//# sourceMappingURL=errorHandler.js.map