import { Request, Response } from "express";
import { OrderValidationZodSchema } from "./orderValidationZodSchema";
import { OrderService } from "./order.services";
import { z } from "zod";



    const createOrder = async (req: Request, res: Response) => {
        try {
          // Extract the order data from the request body
          const order = req.body;
      
          // Validate the order data using the Zod validation schema
          const zodParseData = await OrderValidationZodSchema.parse(order);
      
          // Call the service method to create the order
          const orderedResult = await OrderService.createOrder(zodParseData);
      
          // Send a success response if the order is created successfully
          res.status(201).json({
            success: true,
            message: "Order created successfully!",
            data: orderedResult,
          });
        } catch (error) {
          // Handle validation errors or any other errors that occur during order creation
          console.error("Error occurred while creating the order:", error);
      
          let errorMessage = "An unexpected error occurred";
          if (error instanceof z.ZodError) {
            errorMessage = "Validation failed";
          }
      
          // Send an error response with the appropriate error message
          res.status(400).json({
            success: false,
            message: errorMessage,
          
          });
        }
      };


export const OrderControler={
    createOrder,
}

