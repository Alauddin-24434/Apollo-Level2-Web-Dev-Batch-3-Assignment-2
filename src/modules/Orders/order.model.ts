import { Schema, model } from "mongoose";
import { Order } from "./order.interface";

// orderschema 
const orderSchema= new Schema <Order>({
    email: {type: String, required:true},
    productId:{type: String, required:true},
    price: {type: Number, required:true},
    quantity: {type: Number, required:true},
   
}, {versionKey:false});

// expport OrderMoldel
export const OrderModel=model<Order>('Order', orderSchema)

