import express, { Request, Response } from "express";
import cors from 'cors';
import { ProductRoutes } from "./modules/products/product.route";
const app = express();

// cors
app.use(cors());

//parsers
app.use(express.json());

app.use("/api/products", ProductRoutes);


app.get("/", (req: Request, res: Response) => {
  res.send("Welcome hello world my");
});



export default app;