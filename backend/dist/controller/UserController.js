"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLogin = exports.handleRegisterUser = void 0;
const zod_middleware_1 = require("../validation/zod.middleware");
const UserModel_1 = require("../model/UserModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const handleRegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = yield zod_middleware_1.UserValidationSchema.parseAsync(req.body);
        //checking user if exits
        const isUserExits = yield UserModel_1.UserModel.findOne({ email: isValid.email });
        if (!isUserExits) {
            //hasing password
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashPassword = yield bcrypt_1.default.hash(isValid.password, salt);
            //saving user to database
            yield UserModel_1.UserModel.create(Object.assign(Object.assign({}, isValid), { password: hashPassword }));
            res.json({ succes: true, message: "User Registered Succesful" });
        }
        else {
            res.status(400)
                .json({ succes: false, message: "Email Already Registered" });
        }
    }
    catch (error) {
        res.status(500).json({
            succes: false, message: error.issues ?
                error.issues[0].message : "Internal Server Error",
        });
    }
});
exports.handleRegisterUser = handleRegisterUser;
const handleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = yield zod_middleware_1.UserValidationSchema.parseAsync(req.body);
        const isExists = yield UserModel_1.UserModel.findOne({ email: isValid.email });
        if (isExists) {
            const isPasswordCorrect = yield bcrypt_1.default.compare(isValid.password, isExists.password);
            if (isPasswordCorrect) {
                //generating jwt token
                const token = jsonwebtoken_1.default.sign({ userId: isExists._id }, process.env.jwt_secret || "", { expiresIn: "24hr" });
                res.json({ succes: true, message: "Logged In Succes", token });
            }
            else {
                res.json({ succes: false, message: "Incorrect Password" });
            }
        }
        else {
            res.json({ succes: false, message: "User Not Registered" });
        }
    }
    catch (error) {
        res.status(500).json({
            succes: false, message: error.issues ?
                error.issues[0].message : "Internal Server Error",
        });
    }
});
exports.handleLogin = handleLogin;
