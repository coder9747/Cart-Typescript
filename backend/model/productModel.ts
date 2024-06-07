import mongoose from "mongoose";
import { dbConnect } from "../libs/dbConnect";

const ProductSchema = new mongoose.Schema({
    name: {
        types: String,
    },
    price: {
        type: String,
    },
    imageUrl: {
        type: String,
    }
},{timestamps:true});




export const ProductModel = mongoose.model('product', ProductSchema);



