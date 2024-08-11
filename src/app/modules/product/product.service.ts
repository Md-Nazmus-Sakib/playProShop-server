import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { productSearchableFields } from "./product.constant";

//get all Product
const getAllProductFromDB = async (query: Record<string, unknown>) => {
  try {
    // Create an instance of QueryBuilder to build the query
    const productQuery = new QueryBuilder(Product.find(), query)
      .search(productSearchableFields)
      .filter()
      .priceRange();

    // Perform the count query before pagination
    const totalProducts = await productQuery.modelQuery
      .clone()
      .countDocuments();

    // Apply sorting and pagination
    productQuery.sort().paginate();

    // Execute the final query with sorting and pagination
    const products = await productQuery.modelQuery;

    // Return the products along with the total count
    return {
      totalProducts,
      products,
    };
  } catch (error) {
    console.error("Error fetching products from DB:", error);
    throw new Error("Failed to fetch products");
  }
};

//   const productQuery = new QueryBuilder(Product.find(), query)

//     .search(productSearchableFields)

//     .filter()
//     .priceRange()
//     .sort()
//     .paginate();

//   const result = await productQuery.modelQuery;

//   return result;
// };
// Get All Query
const getAllProductQueryInDB = async () => {
  const categories = await Product.distinct("category");
  const brands = await Product.distinct("brand");
  const maxPrice = await Product.aggregate([
    {
      $group: {
        _id: null,
        maxPrice: { $max: "$price" },
      },
    },
  ]);
  const queryData = { categories, brands, maxPrice };
  return queryData;
};

//get single product by id
const getSingleProductInfoIntoDB = async (productId: string) => {
  //check if the product is exist
  const existProduct = await Product.findById(productId);
  if (!existProduct) {
    throw new AppError(httpStatus.NOT_FOUND, "Product  not found");
  }
  // Find the booking information by the product's ID
  const productInfo = await existProduct;
  return productInfo;
};

//create Product
const createProductInfoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

//Update Product Service
const updateProductInfoIntoDB = async (
  id: string,
  payload: Partial<TProduct>
) => {
  // Find the product by its ID
  const product = await Product.findById(id);

  // Check if the product is found
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "product not found");
  }

  const result = await Product.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, runValidators: true }
  );

  return result;
};

//Delete Product
const deleteProductFromDB = async (productId: string) => {
  // Find the product by its ID
  const product = await Product.findById(productId);

  // Check if the product is found
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }

  const result = await product.deleteOne();

  return result;
};

export const ProductServices = {
  getAllProductFromDB,
  getAllProductQueryInDB,
  getSingleProductInfoIntoDB,
  createProductInfoDB,
  updateProductInfoIntoDB,
  deleteProductFromDB,
};
