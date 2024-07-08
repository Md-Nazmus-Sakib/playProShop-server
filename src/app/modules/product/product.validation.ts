import { z } from "zod";

const productValidationSchema = z.object({
  body: z.object({
    productName: z
      .string()
      .trim()
      .min(1, { message: "Product Name is required" }),

    category: z.string().trim().min(1, { message: "Category is required" }),

    stockQuantity: z
      .number()
      .int({ message: "Stock quantity must be an integer" })
      .min(0, { message: "Stock quantity must be at least 0" })
      .nonnegative({ message: "Stock quantity must be nonnegative" }),

    brand: z.string().trim().min(1, { message: "Brand is required" }),

    rating: z
      .number()
      .min(0, { message: "Rating must be at least 0" })
      .max(5, { message: "Rating must be at most 5" }),

    productDescription: z
      .string()
      .trim()
      .min(1, { message: "Product Description is required" }),

    price: z.number().min(0, { message: "Price must be at least 0" }),

    image: z.string().trim().min(1, { message: "Image url is required" }),
  }),
});
export const ProductValidation = {
  productValidationSchema,
};
