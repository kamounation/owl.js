"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MorganFactory", {
    enumerable: true,
    get: ()=>MorganFactory
});
const _morgan = _interopRequireDefault(require("morgan"));
const _logger = require("./logger");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const logger = new _logger.Logger("developement");
_morgan.default.token("message", (req, res)=>res.locals.errorMessage || "");
let MorganFactory = class MorganFactory {
    constructor(){
        this.getIpFormat = ()=>logger.config === "production" ? ":remote-addr - " : "";
        this.successResponseFormat = `${this.getIpFormat()}:method :url :status - :response-time ms`;
        this.errorResponseFormat = `${this.getIpFormat()}:method :url :status - :response-time ms - message: :message`;
        this.successHandler = (0, _morgan.default)(this.successResponseFormat, {
            skip: (req, res)=>res.statusCode >= 400,
            stream: {
                write: (message)=>logger.logger.info(message.trim())
            }
        });
        this.errorHandler = (0, _morgan.default)(this.errorResponseFormat, {
            skip: (req, res)=>res.statusCode < 400,
            stream: {
                write: (message)=>logger.logger.error(message.trim())
            }
        });
    }
};

//# sourceMappingURL=morganConf.js.map