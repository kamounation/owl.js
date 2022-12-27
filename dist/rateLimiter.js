"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "authLimiter", {
    enumerable: true,
    get: ()=>authLimiter
});
const _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const authLimiter = (0, _expressRateLimit.default)({
    windowMs: 15 * 60 * 1000,
    max: 20,
    skipSuccessfulRequests: true
});

//# sourceMappingURL=rateLimiter.js.map