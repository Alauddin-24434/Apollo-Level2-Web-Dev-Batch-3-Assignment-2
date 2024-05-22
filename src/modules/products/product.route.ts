import express from "express";
import { ProductControlerrs } from "./product.controller";
// carete express router
const router = express.Router();

// Create Product
// import ProductControlerrs.createProduct from ProductControlerrs file
router.post("/", ProductControlerrs.createProduct);

// get All prodtct
// or conditioanly  query access name , description and category
router.get("/", ProductControlerrs.getAllProduct);

// get ProductBId with req.params id
router.get("/:productId", ProductControlerrs.getProductById);

// update ProductById with req.params id
router.put('/:productId', ProductControlerrs.productUpdateById )

// delete ProductById with req.params id
router.delete('/:productId', ProductControlerrs.deleteProductById )

// export ProductRotes
export const ProductRoutes = router;
