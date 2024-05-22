import { z } from "zod";


// Define the Variant schema
const variantSchema = z.object({
  type: z.string().min(1, "Type is required"),
  value: z.string().min(1, "Value is required")
});

// Define the Inventory schema
const inventorySchema = z.object({
  quantity: z.number().min(0, "Quantity must be a non-negative number"),
  inStock: z.boolean().default(true)
});

// Define the Product schema
const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be a non-negative number"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string().min(1, "Tags must be non-empty strings")).min(1, "At least one tag is required"),
  variants: z.array(variantSchema).min(1, "At least one variant is required"),
  inventory: inventorySchema
});

// Export the Product schema
export const ProductValidationSchema = productSchema;
