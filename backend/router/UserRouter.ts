import express, { Router } from "express";
import { handleLogin, handleRegisterUser } from "../controller/UserController";

export const UserRouter:Router = express.Router();


UserRouter.post('/register',handleRegisterUser);
UserRouter.post('/login',handleLogin);


