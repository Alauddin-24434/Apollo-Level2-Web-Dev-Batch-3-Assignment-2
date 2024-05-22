import { Request, Response } from "express";
import { OrderValidationZodSchema } from "./orderValidationZodSchema";
import { OrderService } from "./order.services";

import { z } from "zod";
import { ProductModel } from "../products/product.model";

const createOrder = async (req: Request, res: Response) => {
    try {
        const order = req.body;

        // Validate the order data using the Zod validation schema
        const zodParseData = await OrderValidationZodSchema.parse(order);

        // Fetch the product from the database
        const product = await ProductModel.findById(zodParseData.productId);

        // If the product is not found, return an error response
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Check if the ordered quantity is available in the inventory
        if (product.inventory.quantity < zodParseData.quantity) {
            return res.status(400).json({
                success: false,
                message: "Insufficient quantity available in inventory",
            });
        }

        // Reduce the available quantity in the inventory
        product.inventory.quantity -= zodParseData.quantity;

        // Update the inStock status based on the new quantity
        product.inventory.inStock = product.inventory.quantity > 0;

        // Save the updated product
        await product.save();

        // Call the service method to create the order
        const orderedResult = await OrderService.createOrder(zodParseData);

        // Send a success response if the order is created successfully
        res.status(201).json({
            success: true,
            message: "Order created successfully!",
            data: orderedResult,
        });
    } catch (error) {
        console.error("Error occurred while creating the order:", error);

        let errorMessage = "Product not found";

        if (error instanceof z.ZodError) {
            errorMessage = "Validation failed: " + error.errors.map(e => e.message).join(", ");
        }

        res.status(400).json({
            success: false,
            message: errorMessage,
        });
    }
};




// const createOrder = async (req: Request, res: Response) => {
//   try {
//     // Extract the order data from the request body
//     const order = req.body;

//     // Validate the order data using the Zod validation schema
//     const zodParseData = OrderValidationZodSchema.parse(order);

//     // Validate the productId to ensure it's a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(zodParseData.productId)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid product ID",
//       });
//     }

//     // Check if the productId exists in the product collection
//     const productExists = await ProductModel.findById(zodParseData.productId);
//     if (!productExists) {
//       return res.status(404).json({
//         success: false,
//         message: `Product with ID '${zodParseData.productId}' does not exist.`,
//       });
//     }

//     // Call the service method to create the order
//     const orderedResult = await OrderService.createOrder(zodParseData);

//     // Send a success response if the order is created successfully
//     res.status(201).json({
//       success: true,
//       message: "Order created successfully!",
//       data: orderedResult,
//     });
//   } catch (error) {
//     // Handle validation errors or any other errors that occur during order creation
//     console.error("Error occurred while creating the order:", error);

//     let errorMessage = "An unexpected error occurred";
//     if (error instanceof z.ZodError) {
//       errorMessage =
//         "Validation failed: " + error.errors.map((e) => e.message).join(", ");
//     }

//     // Send an error response with the appropriate error message
//     res.status(400).json({
//       success: false,
//       message: errorMessage,
//       // Optional: include the actual error message for debugging purposes (if needed)
//     });
//   }
// };




const getAllOrder = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    console.log(email);

    const orderedResult = await OrderService.getAllOrder(email);

    if (!orderedResult.length && email) {
      return res.json({
        success: false,
        message: `No products matching search term '${email}'`,
      });
    }

    if (!email) {
      return res.status(200).json({
        success: true,

        message: "Orders fetched successfully!",
        data: orderedResult,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Orders fetched successfully for user email!",
        data: orderedResult,
      });
    }
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

export const OrderController = {
  createOrder,
  getAllOrder,
};
