import { Schema, model, connect } from "mongoose";
import { Inventory, Product, Variant } from "./product.interface";

const variantSchema = new Schema<Variant>({
    type: { type: String, required: true },
    value: { type: String, required: true }
}, { _id: false }); // Exclude _id from variants

const inventorySchema = new Schema<Inventory>({
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, default: true }
}, { _id: false }); // Exclude _id from inventory

const productSchema = new Schema<Product>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: { type: [String], required: true }, // Array of strings
    variants: [variantSchema],
    inventory:inventorySchema, // Embedded inventory schema
});


export const ProductModel=model<Product>('Product', productSchema)