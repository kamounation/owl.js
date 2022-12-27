/// <reference types="qs" />
/// <reference types="express" />
declare class TestController {
    private model;
    constructor();
    saveDataToDb: (req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: import("express").Response<any, Record<string, any>>, next: import("express").NextFunction) => void;
}
export default TestController;
