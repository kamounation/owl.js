/**
 * @class ErrorRes  extends the default `Error` class that Javascript provides for handling errors
 *  @param stack would display the error from stmd if NODE_ENV is set to "development"
 * @param statusCode sends the api response status code to the client
 */
export class ErrorRes extends Error {
  public stack?: string;
  public statusCode: number;
  public isOperational?: boolean;

  constructor(
    statusCode: number,
    message: string,
    isOperational: boolean = true,
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
