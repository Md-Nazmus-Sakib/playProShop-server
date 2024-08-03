/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TConfirmOrderRequest } from "./confirmOrder.interface";
import Order, { generateOrderId } from "./confirmOrder.model";
import { Product } from "../product/product.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

// get order by email and last item

const getOrderByEmailIntoDB = async (email: string) => {
  //check if the product is exist
  const orders = await Order.find({ userEmail: email }).sort({ createdAt: -1 });

  if (orders.length === 0) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `No orders found for this email: ${email}`
    );
  }

  const lastOrder = orders[0];
  const lastItem = Object.entries(lastOrder.orderedProduct).pop();

  return lastItem;
};

//create Order
const createOrderInfoDB = async (orderData: TConfirmOrderRequest) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { orderedProduct } = orderData;
    // Check if all products exist and their quantities are within stock limits
    for (const [productId, quantity] of Object.entries(orderedProduct)) {
      const product = await Product.findById(productId).session(session);

      if (!product) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          `Product not found: ${productId}`
        );
      }
      if (quantity > product.stockQuantity) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          `Stock unavailable for product: ${productId}`
        );
      }
    }

    // Deduct quantities from stock
    for (const [productId, quantity] of Object.entries(orderedProduct)) {
      await Product.findByIdAndUpdate(
        productId,
        { $inc: { stockQuantity: -quantity } },
        { session }
      );
    }

    // Generate order ID
    const orderId = generateOrderId(orderData);

    // Create the order
    const order = await Order.create([{ ...orderData, orderId }], { session });

    await session.commitTransaction();
    session.endSession();
    return order;
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();

    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      `Order creation failed: ${error.message}`
    );
  }
};

export const OrderServices = {
  createOrderInfoDB,
  getOrderByEmailIntoDB,
};
