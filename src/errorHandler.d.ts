export declare class ErrorRes extends Error {
    stack?: string;
    statusCode: number;
    isOperational?: boolean;
    constructor(statusCode: number, message: string, isOperational?: boolean, stack?: string);
}
