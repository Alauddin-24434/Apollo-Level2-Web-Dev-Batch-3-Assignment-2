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
exports.OrderControler = void 0;
const orderValidationZodSchema_1 = require("./orderValidationZodSchema");
const order_services_1 = require("./order.services");
const zod_1 = require("zod");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract the order data from the request body
        const order = req.body;
        // Validate the order data using the Zod validation schema
        const zodParseData = yield orderValidationZodSchema_1.OrderValidationZodSchema.parse(order);
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
        // Handle validation errors or any other errors that occur during order creation
        console.error("Error occurred while creating the order:", error);
        let errorMessage = "An unexpected error occurred";
        if (error instanceof zod_1.z.ZodError) {
            errorMessage = "Validation failed";
        }
        // Send an error response with the appropriate error message
        res.status(400).json({
            success: false,
            message: errorMessage,
        });
    }
});
exports.OrderControler = {
    createOrder,
};
