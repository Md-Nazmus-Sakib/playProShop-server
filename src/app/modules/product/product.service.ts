import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";

//get all Product
const getAllProductFromDB = async () => {
  const result = await Product.find();
  return result;
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
  createProductInfoDB,
  getAllProductFromDB,
  deleteProductFromDB,
};
