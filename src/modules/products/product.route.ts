import express from "express";
import { ProductControlerrs } from "./product.controller";

const router = express.Router();

router.post("/", ProductControlerrs.createProduct);
router.get("/", ProductControlerrs.getAllProduct);

router.get("/:productId", ProductControlerrs.getProductById);
router.put('/:productId', ProductControlerrs.productUpdateById )

router.delete('/:productId', ProductControlerrs.deleteProductById )

export const ProductRoutes = router;
