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
exports.ProductControlerrs = void 0;
const product_services_1 = require("./product.services");
const productValidationZodSchema_1 = require("./productValidationZodSchema");
const zod_1 = require("zod");
const product_model_1 = require("./product.model");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        // Parse and validate the incoming data using Zod
        const zodParseData = productValidationZodSchema_1.ProductValidationSchema.parse(productData);
        // Check if a product with the same name already exists
        const existingProduct = yield product_model_1.ProductModel.findOne({ name: zodParseData.name });
        // If a product with the same name exists, return a meaningful message
        if (existingProduct) {
            return res.status(400).json({
                success: false,
                message: `A product with the name '${zodParseData.name}' already exists.`,
            });
        }
        // Call the service method to create the product
        const result = yield product_services_1.ProductServices.createProduct(zodParseData);
        // Send the success response
        res.status(201).json({
            success: true,
            message: "Product is created successfully!",
            data: result,
        });
    }
    catch (error) {
        // Handle errors
        //   console.error("Error occurred while creating the product:", error);
        // Determine the error type
        let errorMessage = "An unexpected error occurred";
        if (error instanceof zod_1.z.ZodError) {
            // Handle Zod validation errors
            errorMessage = "Validation failed: " + error.errors.map(e => e.message).join(", ");
        }
        // Send the error response
        res.status(500).json({
            success: false,
            message: errorMessage,
            // Optional: include the actual error message for debugging purposes (if needed)
            // error: error.message
        });
    }
});
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract the searchTerm from the query parameters
        const searchTerm = req.query.searchTerm;
        // Call the service method to get all products with optional searchTerm
        const result = yield product_services_1.ProductServices.getAllProduct(searchTerm);
        // If no products found and searchTerm is provided, return a specific message
        if (!result.length && searchTerm) {
            return res.json({
                success: false,
                message: `No products matching search term '${searchTerm}'`,
            });
        }
        if (!searchTerm) {
            return res.status(200).json({
                success: true,
                message: "Products fetched successfully!",
                data: result,
            });
        }
        else {
            return res.status(200).json({
                success: true,
                message: `Products matching search term '${searchTerm}' fetched successfully!`,
                data: result,
            });
        }
        // Send the success response
    }
    catch (error) {
        // Handle errors
        //   console.error("Error occurred while fetching products:", error);
        // Send the error response
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching products",
            //   error: error.message
        });
    }
});
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        // Call the service method to get product by id
        const result = yield product_services_1.ProductServices.getProductById(productId);
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
    }
    catch (error) {
        // Handle errors
        // console.error("Error occurred while fetching the product:", error);
        // Send the error response
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching the product",
            //   error: error.message
        });
    }
});
const productUpdateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updateData = req.body;
        const updatedProduct = yield product_services_1.ProductServices.productUpdateById(productId, updateData);
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
    }
    catch (error) {
        console.error("Error occurred while updating the product:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the product",
            // error: error.message
        });
    }
});
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const deletedProduct = yield product_services_1.ProductServices.deleteProductById(productId);
    if (!deletedProduct) {
        return res.status(404).json({
            success: false,
            message: "Product not found or no delete",
        });
    }
    else {
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: null,
        });
    }
});
exports.ProductControlerrs = {
    createProduct,
    getAllProduct,
    getProductById,
    productUpdateById,
    deleteProductById,
};
