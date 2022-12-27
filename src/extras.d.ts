import { NextFunction, Request, Response, Router, Application } from "express";
import httpStatus from "http-status";
import { Schema as MongoSchema, Model, Collection as MongoCollection, MongooseError as MongoError, ConnectOptions, Document } from "mongoose";
import { ErrorRes } from "errorHandler";
export interface IOwlMongooseD extends Document {
}
export declare const MongooseSchema: typeof MongoSchema;
export declare const MongooseModel: Model<any, {}, {}, {}, any>;
export interface MongooseCollection extends MongoCollection {
}
export declare const MongooseError: typeof MongoError;
export declare const apiStatus: httpStatus.HttpStatus;
export declare const catchAsync: TypeCatchAsync;
export declare const errorRes: typeof ErrorRes;
export declare const OwlRouter: typeof Router;
export type TypeOwlRouter = Router;
export type TypeOwlResponse = Response;
export type TypeOwlRequest = Request;
export type TypeOwlNextFunc = NextFunction;
export type TypeCatchAsync = (fn: any) => (req: Request, res: Response, next: NextFunction) => void;
export type TypeInjectable = Application;
export interface OwlRoute {
    path?: string;
    router: TypeOwlRouter;
}
export type MongoParam = {
    url: string;
    options: ConnectOptions;
};
