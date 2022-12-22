import { OwlRoute, OwlRouter, TypeOwlRouter } from "extras";
import TestController from "./controller";

class TestRoute implements OwlRoute {
  public path: string = "/user";
  public router: TypeOwlRouter = OwlRouter();
  private controller = new TestController();
  constructor() {
    this.Routes();
  }

  public Routes() {
    this.router.post(`${this.path}`, this.controller.saveDataToDb);
  }
}

export default TestRoute;
