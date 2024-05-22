import { z } from "zod";


const OrderSchema= z.object({
    email:z.string().email(),
    productId:z.string(),
    price:z.number().positive(),
    quantity:z.number().int(),
})

export const OrderValidationZodSchema= OrderSchema;