/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-explicit-any

import { ProductServices } from "./product.service";
import sendResponse from "../../utils/sendResponce";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

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
};
