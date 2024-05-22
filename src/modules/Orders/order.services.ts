import { Order } from "./order.interface"
import { OrderModel } from "./order.model"

const createOrder= async (order:Order)=>{
const orderedResult= await OrderModel.create(order);
return orderedResult;
}

export const OrderService={
    createOrder,
}