import mongoose from "mongoose";
export async function dbConnect() {

    try {
        await mongoose.connect(process.env.mongodb_uri || "");
        console.log('Db Connected Succesful');
    } catch (error: any) {
        console.log('Error Occured :', error.message);
    }
}