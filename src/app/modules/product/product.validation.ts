import { z } from "zod";

const productValidationSchema = z.object({
  body: z.object({
    data: z.object({
      productName: z
        .string()
        .trim()
        .min(2, { message: "Product Name is required" }),
      description: z
        .string()
        .trim()
        .min(2, { message: "Product Description is required" }),

      category: z.string().trim().min(2, { message: "Category is required" }),

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

      price: z.number().min(0, { message: "Price must be at least 0" }),

      image: z.string().trim().min(1, { message: "Image url is required" }),
      details: z
        .string()
        .trim()
        .min(1, { message: "Product Description is required" }),
    }),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    productName: z
      .string()
      .trim()
      .min(2, { message: "Product Name is required" })
      .optional(),
    description: z
      .string()
      .trim()
      .min(2, { message: "Product Description is required" })
      .optional(),

    category: z
      .string()
      .trim()
      .min(2, { message: "Category is required" })
      .optional(),

    stockQuantity: z
      .number()
      .int({ message: "Stock quantity must be an integer" })
      .min(0, { message: "Stock quantity must be at least 0" })
      .nonnegative({ message: "Stock quantity must be nonnegative" })
      .optional(),

    brand: z
      .string()
      .trim()
      .min(1, { message: "Brand is required" })
      .optional(),

    rating: z
      .number()
      .min(0, { message: "Rating must be at least 0" })
      .max(5, { message: "Rating must be at most 5" })
      .optional(),

    price: z
      .number()
      .min(0, { message: "Price must be at least 0" })
      .optional(),

    image: z
      .string()
      .trim()
      .min(1, { message: "Image url is required" })
      .optional(),
    details: z
      .string()
      .trim()
      .min(1, { message: "Product Description is required" })
      .optional(),
  }),
});

export const ProductValidation = {
  productValidationSchema,
  updateProductValidationSchema,
};
