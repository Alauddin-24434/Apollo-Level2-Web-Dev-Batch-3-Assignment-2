import { Schema, model, } from "mongoose";
import { Variant, Inventory, Product } from "./product.interface";

// variantSchema for prodactschema's  variant instance
const variantSchema = new Schema<Variant>({
  type: { type: String, required: true },
  value: { type: String, required: true }
}, { _id: false }); // Exclude _id from variants

// invetorySchema for prodactschema's  inventory instance
const inventorySchema = new Schema<Inventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, default: true }
}, { _id: false }); // Exclude _id from inventory

// main product craete schema 
const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true }, // Array of strings
  variants: { type: [variantSchema], required: true }, // Array of Variant, required
  inventory: { type: inventorySchema, required: true } // Inventory, required
},{versionKey:false});


// export ProdactModel 

export const ProductModel = model<Product>('Product', productSchema);
