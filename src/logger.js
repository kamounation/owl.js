"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const tslib_1 = require("tslib");
const winston_1 = tslib_1.__importDefault(require("winston"));
class Logger {
    error(err) {
        throw new Error("Method not implemented.");
    }
    constructor(nodeEnv) {
        this.enumerateErrorFormat = winston_1.default.format((info) => {
            if (info instanceof Error) {
                Object.assign(info, { message: info.stack });
            }
            return info;
        });
        this.logger = winston_1.default.createLogger({
            level: this.config === "development" ? "debug" : "info",
            format: winston_1.default.format.combine(this.enumerateErrorFormat(), this.config === "development"
                ? winston_1.default.format.colorize()
                : winston_1.default.format.uncolorize(), winston_1.default.format.splat(), winston_1.default.format.printf(({ level, message }) => `${level}: ${message}`)),
            transports: [
                new winston_1.default.transports.Console({
                    stderrLevels: ["error"],
                }),
            ],
        });
        this.config = nodeEnv;
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map