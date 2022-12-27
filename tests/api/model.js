"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extras_1 = require("extras");
const mongoose_1 = require("mongoose");
const schema = new extras_1.MongooseSchema({
    name: {
        type: String,
        required: true,
        minlength: 2,
    },
    age: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
        default: "Nigeria",
    },
}, {
    timestamps: true,
});
const testModel = (0, mongoose_1.model)("test-db", schema);
exports.default = testModel;
//# sourceMappingURL=model.js.map