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

export const ProductServices = {
  createProductInfoDB,
  getAllProductFromDB,
};
