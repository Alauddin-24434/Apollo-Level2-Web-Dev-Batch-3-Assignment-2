"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./modules/products/product.route");
const order_route_1 = require("./modules/Orders/order.route");
const app = (0, express_1.default)();
// cors
app.use((0, cors_1.default)());
//parsers
app.use(express_1.default.json());
// prducts endpoint 
// ProductRouts import from product.route file
app.use("/api/products", product_route_1.ProductRoutes);
// Order endpoint 
// OrderRoutes import from order.route file
app.use("/api/orders", order_route_1.OrderRoutes);
// its root endpoint
app.get("/", (req, res) => {
    res.send("Welcome to e-commerce-server");
});
exports.default = app;
