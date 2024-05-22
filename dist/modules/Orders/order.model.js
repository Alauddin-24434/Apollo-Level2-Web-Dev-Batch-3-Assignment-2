"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
// orderschema 
const orderSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    productId: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
}, { versionKey: false });
// expport OrderMoldel
exports.OrderModel = (0, mongoose_1.model)('Order', orderSchema);
