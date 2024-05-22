// Import the Product interface, which defines the structure of a product object
import { Types } from "mongoose";
import { Product } from "./product.interface";

// Import the ProductModel, which is the Mongoose model used to interact with the products collection in the database
import { ProductModel } from "./product.model";

// Function to create a new product
// Accepts a product object of type Product
// Returns the created product object
const createProduct = async (product: Product) => {
  // Check if a product with the same name already exists
 
  // Create a new product in the database using the ProductModel
  const result = await ProductModel.create(product);
  // Return the created product object
  return result;
};


// Function to get all products
// Returns an array of all product objects in the database
const getAllProduct = async (searchTerm: string) => {
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
  const result = await ProductModel.find(query);


  return result;
};




// Function to get a product by its ID
// Accepts an id of type String
// Returns the product object with the matching ID, or null if not found
const getProductById = async (id: string) => {
  // Find the product by ID in the database using the ProductModel
  const result = await ProductModel.findById(id);
  // Return the found product object or null
  return result;
};

// Function to update a product by its ID
// Accepts an id of type String and an updateData object of type Partial<Product>
// Returns the updated product object
const productUpdateById = async (id: string, updateData: Partial<Product>) => {
  // Update the product in the database by its ID using the ProductModel
  // $set operator is used to update only the fields provided in the updateData object
  await ProductModel.updateOne({ _id: id }, { $set: updateData });

  // Find the updated product by its ID to return the updated product data
  const updatedProduct = await ProductModel.findById(id);
  // Return the updated product object
  return updatedProduct;
};

const deleteProductById = async (productId: string | Types.ObjectId) => {
  try {
    const deletedProduct = await ProductModel.deleteOne({ _id: productId });
    return deletedProduct;
  } catch (error) {
    // Handle errors
    // console.error("Error occurred while deleting the product:", error);
    // throw error;
  }
};

// Export an object containing all the service functions
// These functions can be imported and used in other parts of the application
export const ProductServices = {
  createProduct,
  getAllProduct,
  getProductById,
  productUpdateById,
  deleteProductById
};
