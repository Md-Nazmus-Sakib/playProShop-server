import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponce";
import { OrderServices } from "./confirmOrder.service";

//get last order by email controller
const getOrderByEmail = catchAsync(async (req, res) => {
  const { email } = req.params;

  const result = await OrderServices.getOrderByEmailIntoDB(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order is retrieved successfully",
    data: result,
  });
});

//create Order controller
const createOrder = catchAsync(async (req, res) => {
  const orderData = req.body.orderData;

  const result = await OrderServices.createOrderInfoDB(orderData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order is Created Successfully",
    data: result,
  });
});

export const OrderControllers = {
  createOrder,
  getOrderByEmail,
};
