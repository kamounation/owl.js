import winston from "winston";
import { ErrorRes } from "./errorHandler";
export declare class Logger {
    error(err: ErrorRes): void;
    config: string;
    constructor(nodeEnv: string);
    private enumerateErrorFormat;
    logger: winston.Logger;
}
