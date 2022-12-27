"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Logger", {
    enumerable: true,
    get: ()=>Logger
});
const _winston = _interopRequireDefault(require("winston"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let Logger = class Logger {
    error(err) {
        throw new Error("Method not implemented.");
    }
    constructor(nodeEnv){
        this.enumerateErrorFormat = _winston.default.format((info)=>{
            if (info instanceof Error) {
                Object.assign(info, {
                    message: info.stack
                });
            }
            return info;
        });
        this.logger = _winston.default.createLogger({
            level: this.config === "development" ? "debug" : "info",
            format: _winston.default.format.combine(this.enumerateErrorFormat(), this.config === "development" ? _winston.default.format.colorize() : _winston.default.format.uncolorize(), _winston.default.format.splat(), _winston.default.format.printf(({ level , message  })=>`${level}: ${message}`)),
            transports: [
                new _winston.default.transports.Console({
                    stderrLevels: [
                        "error"
                    ]
                })
            ]
        });
        this.config = nodeEnv;
    }
};

//# sourceMappingURL=logger.js.map