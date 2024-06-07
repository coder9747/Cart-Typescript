"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidationSchema = void 0;
const zod_1 = require("zod");
exports.UserValidationSchema = zod_1.z.object({
    email: zod_1.z.string({ required_error: "Email Is Required" }).email({ message: "Invalid Email Address" }),
    password: zod_1.z.string({ required_error: "Password Required" }).min(6, { message: "Password Must Be 6 Char Long" }).max(18, { message: "Password Should Be max 18 Char Long" })
});
