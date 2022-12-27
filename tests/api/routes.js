"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const extras_1 = require("extras");
const controller_1 = tslib_1.__importDefault(require("./controller"));
class TestRoute {
    constructor() {
        this.path = "/user";
        this.router = (0, extras_1.OwlRouter)();
        this.controller = new controller_1.default();
        this.Routes();
    }
    Routes() {
        this.router.post(`${this.path}`, this.controller.saveDataToDb);
    }
}
exports.default = TestRoute;
//# sourceMappingURL=routes.js.map