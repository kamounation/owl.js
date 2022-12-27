"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const extras_1 = require("extras");
const model_1 = tslib_1.__importDefault(require("./model"));
const errorHandler_1 = require("errorHandler");
class TestController {
    constructor() {
        this.model = model_1.default;
        this.saveDataToDb = (0, extras_1.catchAsync)(async (req, res, next) => {
            const { body } = req;
            const result = await this.model.create(body);
            if (!result)
                return next(new errorHandler_1.ErrorRes(extras_1.apiStatus.INTERNAL_SERVER_ERROR, "cannot save to database"));
            res.status(extras_1.apiStatus.CREATED).send({ id: result._id });
        });
    }
}
exports.default = TestController;
//# sourceMappingURL=controller.js.map