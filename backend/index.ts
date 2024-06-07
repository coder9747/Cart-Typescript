import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnect } from "./libs/dbConnect";
import { UserRouter } from "./router/UserRouter";

const app = express();

//middleware
app.use(express.json());
app.use(cors());
dotenv.config();


app.use("/api/v1/auth",UserRouter);














const port = process.env.PORT || 10000;








app.listen(port, () => {
    dbConnect();
    console.log('Server Running At Port ', port);
})