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
exports.ProductServices = void 0;
// Import the ProductModel, which is the Mongoose model used to interact with the products collection in the database
const product_model_1 = require("./product.model");
// Function to create a new product
// Accepts a product object of type Product
// Returns the created product object
const createProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    // Create a new product in the database using the ProductModel
    const result = yield product_model_1.ProductModel.create(product);
    // Return the created product object
    return result;
});
// Function to get all products
// Returns an array of all product objects in the database
const getAllProduct = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {}; // Default query to find all products
    // If searchTerm is provided, construct a query to search for products
    if (searchTerm) {
        query = {
            $or: [
                { name: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search for name
                { description: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search for description
                { category: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search for category
            ],
        };
    }
    // Find products based on the constructed query
    const result = yield product_model_1.ProductModel.find(query);
    return result;
});
// Function to get a product by its ID
// Accepts an id of type String
// Returns the product object with the matching ID, or null if not found
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the product by ID in the database using the ProductModel
    const result = yield product_model_1.ProductModel.findById(id);
    // Return the found product object or null
    return result;
});
// Function to update a product by its ID
// Accepts an id of type String and an updateData object of type Partial<Product>
// Returns the updated product object
const productUpdateById = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    // Update the product in the database by its ID using the ProductModel
    // $set operator is used to update only the fields provided in the updateData object
    yield product_model_1.ProductModel.updateOne({ _id: id }, { $set: updateData });
    // Find the updated product by its ID to return the updated product data
    const updatedProduct = yield product_model_1.ProductModel.findById(id);
    // Return the updated product object
    return updatedProduct;
});
const deleteProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedProduct = yield product_model_1.ProductModel.deleteOne(id);
    return deletedProduct;
});
// Export an object containing all the service functions
// These functions can be imported and used in other parts of the application
exports.ProductServices = {
    createProduct,
    getAllProduct,
    getProductById,
    productUpdateById,
    deleteProductById
};
