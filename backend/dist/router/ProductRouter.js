"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
const express_1 = __importDefault(require("express"));
const ProductContrller_1 = require("../controller/ProductContrller");
exports.ProductRouter = express_1.default.Router();
// ProductRouter.get("/push",handleProductPUsh);
exports.ProductRouter.get('/getdata', ProductContrller_1.handleGetData);
