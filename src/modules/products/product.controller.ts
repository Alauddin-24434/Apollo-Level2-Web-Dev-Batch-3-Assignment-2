import { Request, Response } from "express";
import { ProductServices } from "./product.services";
import { ProductValidationSchema } from "./productValidationZodSchema";
import { z } from "zod";

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    // Parse and validate the incoming data
    const zodParseData = ProductValidationSchema.parse(productData);

    // Call the service method to create the product
    const result = await ProductServices.createProduct(zodParseData);

    // Send the success response
    res.json({
      success: true,
      message: "Product is created successfully!",
      data: result,
    });
  } catch (error) {
    // Handle errors
    console.error("Error occurred while creating the product:", error);

    // Determine the error type
    let errorMessage = "An unexpected error occurred";
    if (error instanceof z.ZodError) {
      // Handle Zod validation errors
      errorMessage = "Validation failed";
    }

    // Send the error response
    res.status(500).json({
      success: false,
      message: errorMessage,
      //   error: error.message
    });
  }
};
const getAllProduct = async (req: Request, res: Response) => {
    try {
      // Extract the searchTerm from the query parameters
      const searchTerm = req.query.searchTerm as string;
  
      // Call the service method to get all products with optional searchTerm
      const result = await ProductServices.getAllProduct(searchTerm);
  
      // If no products found and searchTerm is provided, return a specific message
      if (!result.length && searchTerm) {
        return res.json({
            success: false,
          message: `No products matching search term '${searchTerm}'`,
      
        });
      }
  
      if(!searchTerm){
       return res.status(200).json({
            success: true,
        
            message : "Products fetched successfully!",
            data: result,
          });
      }
      else{
      return  res.status(200).json({
            success: true,
            message: `Products matching search term '${searchTerm}' fetched successfully!`,
            data: result,
          });
      }
      // Send the success response
     
    } catch (error) {
      // Handle errors
      console.error("Error occurred while fetching products:", error);
  
      // Send the error response
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching products",
        //   error: error.message
      });
    }
  };
  

const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    // Call the service method to get product by id
    const result = await ProductServices.getProductById(productId);

    // Check if product was found
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Send the success response
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (error) {
    // Handle errors
    console.error("Error occurred while fetching the product:", error);

    // Send the error response
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the product",
      //   error: error.message
    });
  }
};

const productUpdateById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;
    const updatedProduct = await ProductServices.productUpdateById(
      productId,
      updateData
    );
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found or no changes made",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error occurred while updating the product:", error);

    res.status(500).json({
      success: false,
      message: "An error occurred while updating the product",
      // error: error.message
    });
  }
};

const deleteProductById = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const deletedProduct = await ProductServices.deleteProductById(productId);

  if (!deletedProduct) {
    return res.status(404).json({
      success: false,
      message: "Product not found or no delete",
    });
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully!",
    data: deletedProduct,
  });
};

export const ProductControlerrs = {
  createProduct,
  getAllProduct,
  getProductById,
  productUpdateById,
  deleteProductById,
};
