import httpStatus from "http-status";
import { Logger } from "./logger";
import { NextFunction, Request, Response } from "express";
import { ErrorRes } from "./errorHandler";

// TODO: get value of NODE_ENV without making a circular imort

export class ErrorFactory {
  constructor(public nodeEnv: string | number) {}

  /**
   * @param err {Error}
   * @variable error  initilazes  ErrorRes{class} and sends to express' NextFunction
   */

  protected logger = new Logger(String(this.nodeEnv));

  public errorConverter = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let error = err;
    // TODO: include mongoose type error check here
    if (!(error instanceof ErrorRes)) {
      // @ts-expect-error
      const statusCode = error.statusCode
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
      const message = error.message || httpStatus[statusCode];

      error = new ErrorRes(statusCode, message.toString(), false, err.stack);
    }
    next(error);
  };

  public errorHandler = (
    err: ErrorRes,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let { statusCode, message } = err;

    if (this.nodeEnv === "production" && !err.isOperational) {
      statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      message = String(httpStatus[httpStatus.INTERNAL_SERVER_ERROR]);
    }

    res.locals.errorMessage = err.message;

    const response = {
      code: statusCode,
      message,
      ...(this.nodeEnv === "development" && { stack: err.stack }),
    };

    if (this.nodeEnv === "development") {
      this.logger.logger.error(err);
    }

    res.status(statusCode).send(response);
  };
}
