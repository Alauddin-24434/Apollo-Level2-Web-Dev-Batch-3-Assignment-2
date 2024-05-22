"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
// carete express router
const router = express_1.default.Router();
// Create Product
// import ProductControlerrs.createProduct from ProductControlerrs file
router.post("/", product_controller_1.ProductControlerrs.createProduct);
// get All prodtct
// or conditioanly  query access name , description and category
router.get("/", product_controller_1.ProductControlerrs.getAllProduct);
// get ProductBId with req.params id
router.get("/:productId", product_controller_1.ProductControlerrs.getProductById);
// update ProductById with req.params id
router.put('/:productId', product_controller_1.ProductControlerrs.productUpdateById);
// delete ProductById with req.params id
router.delete('/:productId', product_controller_1.ProductControlerrs.deleteProductById);
// export ProductRotes
exports.ProductRoutes = router;
