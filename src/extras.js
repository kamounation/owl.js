"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwlRouter = exports.errorRes = exports.catchAsync = exports.apiStatus = exports.MongooseError = exports.MongooseModel = exports.MongooseSchema = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const http_status_1 = tslib_1.__importDefault(require("http-status"));
const catchAsync_1 = require("catchAsync");
const mongoose_1 = require("mongoose");
const errorHandler_1 = require("errorHandler");
exports.MongooseSchema = mongoose_1.Schema;
exports.MongooseModel = mongoose_1.Model;
exports.MongooseError = mongoose_1.MongooseError;
exports.apiStatus = http_status_1.default;
exports.catchAsync = catchAsync_1.catchAsync;
exports.errorRes = errorHandler_1.ErrorRes;
exports.OwlRouter = express_1.Router;
//# sourceMappingURL=extras.js.map