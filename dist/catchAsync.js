"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "catchAsync", {
    enumerable: true,
    get: ()=>catchAsync
});
const catchAsync = (fn)=>(req, res, next)=>{
        Promise.resolve(fn(req, res, next)).catch((err)=>next(err));
    };

//# sourceMappingURL=catchAsync.js.map