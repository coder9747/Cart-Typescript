"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConnect_1 = require("./libs/dbConnect");
const UserRouter_1 = require("./router/UserRouter");
const ProductRouter_1 = require("./router/ProductRouter");
const app = (0, express_1.default)();
//middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
dotenv_1.default.config();
app.use("/api/v1/auth", UserRouter_1.UserRouter);
app.use('/api/v1/product', ProductRouter_1.ProductRouter);
const port = process.env.PORT || 10000;
app.listen(port, () => {
    (0, dbConnect_1.dbConnect)();
    console.log('Server Running At Port ', port);
});
