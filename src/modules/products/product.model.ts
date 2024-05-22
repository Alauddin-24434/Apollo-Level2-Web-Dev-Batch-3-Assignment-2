import { Schema, model, connect } from "mongoose";
import { Variant, Inventory, Product } from "./product.interface";

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
  variants: { type: [variantSchema], required: true }, // Array of Variant, required
  inventory: { type: inventorySchema, required: true } // Inventory, required
});

export const ProductModel = model<Product>('Product', productSchema);
