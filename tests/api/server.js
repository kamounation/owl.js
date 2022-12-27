"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const __1 = require("../..");
const routes_1 = tslib_1.__importDefault(require("./routes"));
const mongoConfig = {
    url: "mongodb://root:password123@localhost:6000",
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
        dbName: "test",
    },
};
const server = new __1.OwlFactory([new routes_1.default()], "development", process.env.PORT || 9000, mongoConfig);
server.listen();
//# sourceMappingURL=server.js.map