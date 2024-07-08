import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";

//get all Product
const getAllProductFromDB = async () => {
  const result = await Product.find();
  return result;
};

//get single product by id
const getSingleProductInfoIntoDB = async (productId: string) => {
  //check if the product is exist
  const existProduct = await Product.findById(productId);
  if (!existProduct) {
    throw new AppError(httpStatus.NOT_FOUND, "Product  not found");
  }
  // Find the booking information by the user's ID
  const productInfo = await existProduct;
  return productInfo;
};

//create Product
const createProductInfoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

//Delete Product
const deleteProductFromDB = async (productId: string) => {
  // Find the bike by its ID
  const product = await Product.findById(productId);

  // Check if the bike is found
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }

  const result = await product.deleteOne();

  return result;
};

export const ProductServices = {
  getAllProductFromDB,
  getSingleProductInfoIntoDB,
  createProductInfoDB,
  deleteProductFromDB,
};
