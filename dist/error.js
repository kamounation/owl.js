"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ErrorFactory", {
    enumerable: true,
    get: ()=>ErrorFactory
});
const _httpStatus = _interopRequireDefault(require("http-status"));
const _logger = require("./logger");
const _errorHandler = require("./errorHandler");
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
let ErrorFactory = class ErrorFactory {
    constructor(nodeEnv){
        this.nodeEnv = nodeEnv;
        this.logger = new _logger.Logger(String(this.nodeEnv));
        this.errorConverter = (err, req, res, next)=>{
            let error = err;
            if (!(error instanceof _errorHandler.ErrorRes)) {
                const statusCode = error.statusCode ? _httpStatus.default.BAD_REQUEST : _httpStatus.default.INTERNAL_SERVER_ERROR;
                const message = error.message || _httpStatus.default[statusCode];
                error = new _errorHandler.ErrorRes(statusCode, message.toString(), false, err.stack);
            }
            next(error);
        };
        this.errorHandler = (err, req, res, next)=>{
            let { statusCode , message  } = err;
            if (this.nodeEnv === "production" && !err.isOperational) {
                statusCode = _httpStatus.default.INTERNAL_SERVER_ERROR;
                message = String(_httpStatus.default[_httpStatus.default.INTERNAL_SERVER_ERROR]);
            }
            res.locals.errorMessage = err.message;
            const response = _objectSpread({
                code: statusCode,
                message
            }, this.nodeEnv === "development" && {
                stack: err.stack
            });
            if (this.nodeEnv === "development") {
                this.logger.logger.error(err);
            }
            res.status(statusCode).send(response);
        };
    }
};

//# sourceMappingURL=error.js.map