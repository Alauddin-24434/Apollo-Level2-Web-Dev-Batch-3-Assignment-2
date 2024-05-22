"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const variantSchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    value: { type: String, required: true }
}, { _id: false }); // Exclude _id from variants
const inventorySchema = new mongoose_1.Schema({
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, default: true }
}, { _id: false }); // Exclude _id from inventory
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: { type: [String], required: true }, // Array of strings
    variants: { type: [variantSchema], required: true }, // Array of Variant, required
    inventory: { type: inventorySchema, required: true } // Inventory, required
});
exports.ProductModel = (0, mongoose_1.model)('Product', productSchema);
