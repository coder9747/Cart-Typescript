import { Request, Response } from "express"
import { UserValidationSchema } from "../validation/zod.middleware";
import { UserData } from "../types/types";
import { UserModel } from "../model/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const handleRegisterUser = async (req: Request, res: Response) => {
    try {
        const isValid: UserData = await UserValidationSchema.parseAsync(req.body);
        //checking user if exits
        const isUserExits = await UserModel.findOne({email:isValid.email});
        if (!isUserExits) {
            //hasing password
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(isValid.password, salt);
            //saving user to database
            await UserModel.create({ ...isValid, password: hashPassword });
            res.json({ succes: true, message: "User Registered Succesful" })
        }
        else {
            res.status(400)
                .json({ succes: false, message: "Email Already Registered" });
        }
    } catch (error: any) {
        res.status(500).json({
            succes: false, message: error.issues ?
                error.issues[0].message : "Internal Server Error",
        });
    }

}
export const handleLogin = async (req: Request, res: Response) => {
    try {

        const isValid: UserData = await UserValidationSchema.parseAsync(req.body);
        const isExists = await UserModel.findOne({ email: isValid.email });
        if (isExists) {
            const isPasswordCorrect = await bcrypt.compare(isValid.password, isExists.password);
            if (isPasswordCorrect) {
                //generating jwt token
                const token = jwt.sign({userId:isExists._id},process.env.jwt_secret || "",{expiresIn:"24hr"});
                res.json({succes:true,message:"Logged In Succes",token});
            }
            else
            {
                res.json({succes:false,message:"Incorrect Password"});
            }
        }
        else {
            res.json({ succes: false, message: "User Not Registered" });
        }

    } catch (error: any) {
        res.status(500).json({
            succes: false, message: error.issues ?
                error.issues[0].message : "Internal Server Error",
        });
    }
}