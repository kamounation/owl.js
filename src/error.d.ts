import { Logger } from "./logger";
import { NextFunction, Request, Response } from "express";
import { ErrorRes } from "./errorHandler";
export declare class ErrorFactory {
    nodeEnv: string | number;
    constructor(nodeEnv: string | number);
    protected logger: Logger;
    errorConverter: (err: Error, req: Request, res: Response, next: NextFunction) => void;
    errorHandler: (err: ErrorRes, req: Request, res: Response, next: NextFunction) => void;
}
