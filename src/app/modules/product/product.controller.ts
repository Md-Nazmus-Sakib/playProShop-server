/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-explicit-any

import { ProductServices } from "./product.service";
import sendResponse from "../../utils/sendResponce";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

//get all product controller
const getAllProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductFromDB(req.query);
  if (result.length === 0) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: false,
      message: "No Data Found",
      data: result,
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products are retrieved successfully",
    data: result,
  });
});
//get all product Query
const getAllProductQuery = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductQueryInDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products Query are retrieved successfully",
    data: result,
  });
});

//get single Product controller
const getSingleProductInfo = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ProductServices.getSingleProductInfoIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is retrieved successfully",
    data: result,
  });
});

//create Product controller
const createProduct = catchAsync(async (req, res) => {
  const productData = req.body.data;
  const result = await ProductServices.createProductInfoDB(productData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is Created Successfully",
    data: result,
  });
});

//Delete Product controller
const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.deleteProductFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product deleted successfully",
    data: result,
  });
});

export const ProductControllers = {
  getAllProduct,
  getAllProductQuery,
  getSingleProductInfo,
  createProduct,
  deleteProduct,
};
