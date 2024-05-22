"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidationSchema = void 0;
const zod_1 = require("zod");
// Define the Variant schema
const variantSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, "Type is required"),
    value: zod_1.z.string().min(1, "Value is required")
});
// Define the Inventory schema
const inventorySchema = zod_1.z.object({
    quantity: zod_1.z.number().min(0, "Quantity must be a non-negative number"),
    inStock: zod_1.z.boolean().default(true)
});
// Define the Product schema
const productSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    description: zod_1.z.string().min(1, "Description is required"),
    price: zod_1.z.number().min(0, "Price must be a non-negative number"),
    category: zod_1.z.string().min(1, "Category is required"),
    tags: zod_1.z.array(zod_1.z.string().min(1, "Tags must be non-empty strings")).min(1, "At least one tag is required"),
    variants: zod_1.z.array(variantSchema).min(1, "At least one variant is required"),
    inventory: inventorySchema
});
// Export the Product schema
exports.ProductValidationSchema = productSchema;
