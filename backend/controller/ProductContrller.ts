



import { Request, Response } from "express"
import { ProductModel } from "../model/productModel";

const products = [
    {
        name: "apple",
        price: "50000",
        imageUrl: "https://www.cnet.com/a/img/resize/a0879a178075dfd2ef154fe29048491de48d8f5c/hub/2020/10/30/067bd108-d594-41a2-a390-2a73f9f1ad41/apple-iphone-12-confetti-9923.jpg?auto=webp&fit=crop&height=675&width=1200",
    },
    {
        name: "samsung",
        price: "40000",
        imageUrl: "https://m.media-amazon.com/images/I/81vxWpPpgNL.jpg",
    },
    {
        name: "moto",
        price: "32000",
        imageUrl: "https://rukminim2.flixcart.com/image/850/1000/xif0q/mobile/2/m/o/edge-40-pay40030in-motorola-original-imagpqzchzhg6fex.jpeg?q=90&crop=false",
    },
    {
        name: "Nokia",
        price: "49000",
        imageUrl: "https://m.media-amazon.com/images/I/61enALLWKSL._AC_UF1000,1000_QL80_.jpg",
    },
]
export const handleProductPUsh = async (req: Request, res: Response) => {
    try {
        await Promise.allSettled(products.map((item) => {
            return ProductModel.create(item);
        }));
        console.log("Item Saved");

    } catch (error) {
        console.log(error);
    }

}
export const handleGetData = async (req: Request, res: Response) => {
    try {
        const data = await ProductModel.find({});
        res.json({
            succes: true,
            data,
        })
    } catch (error: any) {
        console.log(error.message);
    }
}