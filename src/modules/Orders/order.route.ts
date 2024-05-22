
import express from 'express';
import { OrderControler } from './order.controller';


const router=express.Router();

router.post('/', OrderControler.createOrder)

router.get('/', )

export const OrderRoutes= router;