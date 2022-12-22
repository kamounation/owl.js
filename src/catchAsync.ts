import { NextFunction, Request, Response } from "express";

/**
 * Responsible for handling the try catch block and directing any errors to th next function
 * @param fn is usually an asynchronous function
 */

export const catchAsync =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
