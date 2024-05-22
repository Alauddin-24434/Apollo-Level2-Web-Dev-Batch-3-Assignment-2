import express, { Request, Response } from "express";
import cors from 'cors';
import { ProductRoutes } from "./modules/products/product.route";
import { OrderRoutes } from "./modules/Orders/order.route";
const app = express();

// cors
app.use(cors());

//parsers
app.use(express.json());

// prducts endpoint 
// ProductRouts import from product.route file
app.use("/api/products", ProductRoutes);

// Order endpoint 
// OrderRoutes import from order.route file
app.use("/api/orders", OrderRoutes)

// its root endpoint
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to e-commerce-server on port 5000");
});



export default app;