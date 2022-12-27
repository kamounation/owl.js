import express, { Application } from "express";
import { MongoParam, OwlRoute } from "./src/extras";
export declare class OwlFactory {
    app: Application;
    env: string;
    port: string | number;
    private errorFactory;
    private morgan;
    private logger;
    constructor(routes: OwlRoute[], nodeEnv: string, port?: number | string, mongo?: MongoParam);
    Server(): express.Application;
    initMongoDatabase(url: string, options: any): void;
    initMiddlewares(): void;
    private initRoutes;
    private ErrorHandling;
    listen(): void;
}
