"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    MongooseSchema: ()=>MongooseSchema,
    MongooseModel: ()=>MongooseModel,
    MongooseError: ()=>MongooseError,
    apiStatus: ()=>apiStatus,
    catchAsync: ()=>catchAsync,
    errorRes: ()=>errorRes,
    OwlRouter: ()=>OwlRouter
});
const _express = require("express");
const _httpStatus = _interopRequireDefault(require("http-status"));
const _catchAsync = require("catchAsync");
const _mongoose = require("mongoose");
const _errorHandler = require("errorHandler");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const MongooseSchema = _mongoose.Schema;
const MongooseModel = _mongoose.Model;
const MongooseError = _mongoose.MongooseError;
const apiStatus = _httpStatus.default;
const catchAsync = _catchAsync.catchAsync;
const errorRes = _errorHandler.ErrorRes;
const OwlRouter = _express.Router;

//# sourceMappingURL=extras.js.map