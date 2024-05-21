import { Request, Response } from "express";
import { ProductServices } from "./product.services";



const createProduct= async (req:Request, res:Response)=>{
    const productData= req.body;
    const result= await ProductServices.createProduct(productData)
    res.json({
        success: true,
        message: "Product is created successfully !",
        data: result,
      });
}



export const ProductControlerrs={
    createProduct,
}
