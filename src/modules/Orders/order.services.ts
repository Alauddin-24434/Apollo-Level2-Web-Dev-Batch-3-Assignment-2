import { Order } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrder = async (order: Order) => {
  const orderedResult = await OrderModel.create(order);
  return orderedResult;
};

const getAllOrder = async (email: string) => {
  let query = {};

  if (email) {
    query = {email:email};
  }

const orderedResult= await OrderModel.find(query)
return orderedResult;

};

export const OrderService = {
  createOrder,
  getAllOrder,
};
