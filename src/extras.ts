import { Router, RouterOptions } from "express";

export const OwlRouter = Router;
export type TypeOwlRouter = Router;

export interface OwlRoute {
  path?: string;
  router: TypeOwlRouter;
}

export type MongoParam = {
  url: string;
  options: any;
};
