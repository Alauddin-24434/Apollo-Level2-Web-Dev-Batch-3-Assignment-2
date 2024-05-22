"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const orderValidationZodSchema_1 = require("./orderValidationZodSchema");
const order_services_1 = require("./order.services");
const zod_1 = require("zod");
const product_model_1 = require("../products/product.model");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body;
        // Validate the order data using the Zod validation schema
        const zodParseData = yield orderValidationZodSchema_1.OrderValidationZodSchema.parse(order);
        // Fetch the product from the database
        const product = yield product_model_1.ProductModel.findById(zodParseData.productId);
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
        yield product.save();
        // Call the service method to create the order
        const orderedResult = yield order_services_1.OrderService.createOrder(zodParseData);
        // Send a success response if the order is created successfully
        res.status(201).json({
            success: true,
            message: "Order created successfully!",
            data: orderedResult,
        });
    }
    catch (error) {
        // console.error("Error occurred while creating the order:", error);
        let errorMessage = "Product not found";
        if (error instanceof zod_1.z.ZodError) {
            errorMessage = "Validation failed: " + error.errors.map(e => e.message).join(", ");
        }
        res.status(400).json({
            success: false,
            message: errorMessage,
        });
    }
});
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const orderedResult = yield order_services_1.OrderService.getAllOrder(email);
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
        }
        else {
            return res.status(200).json({
                success: true,
                message: "Orders fetched successfully for user email!",
                data: orderedResult,
            });
        }
    }
    catch (error) {
        // Handle errors
        //  console.error("Error occurred while fetching products:", error);
        // Send the error response
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching products",
            //   error: error.message
        });
    }
});
exports.OrderController = {
    createOrder,
    getAllOrder,
};
