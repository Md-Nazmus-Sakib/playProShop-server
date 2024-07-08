/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-explicit-any

import { ProductServices } from "./product.service";
import sendResponse from "../../utils/sendResponce";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

//get all product controller
const getAllProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductFromDB();
  if (result.length === 0) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: result,
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products retrieved successfully",
    data: result,
  });
});

//create Product controller
const createProduct = catchAsync(async (req, res) => {
  const productData = req.body;

  const result = await ProductServices.createProductInfoDB(productData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is Created Successfully",
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProduct,
};
