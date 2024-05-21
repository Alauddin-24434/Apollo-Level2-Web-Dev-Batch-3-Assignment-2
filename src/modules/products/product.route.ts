import express from 'express';
import { ProductControlerrs } from './product.controller';


const router= express.Router();

router.post('/', ProductControlerrs.createProduct)


export const ProductRoutes = router;