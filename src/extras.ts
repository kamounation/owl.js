import { NextFunction, Request, Response, Router, Application } from "express";
import httpStatus from "http-status";
import { catchAsync as async } from "catchAsync";

import {
  Schema as MongoSchema,
  Model,
  Collection as MongoCollection,
  MongooseError as MongoError,
  ConnectOptions,
  Document,
} from "mongoose";
import { ErrorRes } from "errorHandler";

export interface IOwlMongooseD extends Document {}
export const MongooseSchema = MongoSchema;
export const MongooseModel = Model;
export interface MongooseCollection extends MongoCollection {}
export const MongooseError = MongoError;

export const apiStatus: httpStatus.HttpStatus = httpStatus;
export const catchAsync: TypeCatchAsync = async;
export const errorRes: typeof ErrorRes = ErrorRes;

export const OwlRouter = Router;
export type TypeOwlRouter = Router;

export type TypeOwlResponse = Response;
export type TypeOwlRequest = Request;
export type TypeOwlNextFunc = NextFunction;
export type TypeCatchAsync = (
  fn: any
) => (req: Request, res: Response, next: NextFunction) => void;
export type TypeInjectable = Application;

export interface OwlRoute {
  path?: string;
  router: TypeOwlRouter;
}

export type MongoParam = {
  url: string;
  options: ConnectOptions;
};
