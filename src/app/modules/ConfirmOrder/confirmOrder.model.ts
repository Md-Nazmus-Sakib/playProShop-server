import { model, Schema } from "mongoose";
import { TConfirmOrderRequest } from "./confirmOrder.interface";

// Define the schema for the Order
const OrderSchema = new Schema<TConfirmOrderRequest>(
  {
    orderId: { type: String, required: true },
    transactionId: { type: String, required: false },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userMobile: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery", "Card Pay"],
      required: true,
    },
    orderedProduct: { type: Map, of: Number, required: true },
    totalPrice: { type: Number, required: true },
    orderDate: { type: String, required: true },
    paymentDate: { type: String, required: false },
    status: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

// Function to generate a unique order ID
export const generateOrderId = (orderData: TConfirmOrderRequest): string => {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const totalPricePart = orderData.totalPrice.toFixed(0);
  const totalQuantity = Object.values(orderData.orderedProduct).reduce(
    (sum, qty) => sum + qty,
    0
  );

  return `${datePart}${totalPricePart}${totalQuantity}`;
};

// Create the Order model
const Order = model<TConfirmOrderRequest>("Order", OrderSchema);

export default Order;
