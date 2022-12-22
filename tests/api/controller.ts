import {
  TypeOwlRequest,
  TypeOwlResponse,
  TypeOwlNextFunc,
  catchAsync,
  apiStatus,
} from "extras";
import testModel from "./model";
import { ErrorRes } from "errorHandler";

class TestController {
  private model: typeof testModel = testModel;
  constructor() {}

  public saveDataToDb = catchAsync(
    async (
      req: TypeOwlRequest,
      res: TypeOwlResponse,
      next: TypeOwlNextFunc
    ) => {
      const { body } = req;
      const result = await this.model.create(body);

      if (!result)
        return next(
          new ErrorRes(
            apiStatus.INTERNAL_SERVER_ERROR,
            "cannot save to database"
          )
        );

      res.status(apiStatus.CREATED).send({ id: result._id });
    }
  );
}

export default TestController;
