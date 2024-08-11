import { z } from "zod";

// Validation schema for creating a new product
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
        .min(5, { message: "Product Description is required" }),

      category: z.enum(
        [
          "Fitness Equipment",
          "Team Sports Gear",
          "Outdoor Recreation",
          "Water Sports",
          "Cycling",
          "Golf",
        ],
        { message: "Invalid Category" }
      ),

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

      image: z.string().trim().url({ message: "Invalid URL format" }),

      details: z
        .string()
        .trim()
        .min(5, { message: "Product Details are required" }),
    }),
  }),
});

// Validation schema for updating an existing product
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
      .min(5, { message: "Product Description is required" })
      .optional(),

    category: z
      .enum(
        [
          "Fitness Equipment",
          "Team Sports Gear",
          "Outdoor Recreation",
          "Water Sports",
          "Cycling",
          "Golf",
        ],
        { message: "Invalid Category" }
      )
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

    image: z.string().trim().url({ message: "Invalid URL format" }).optional(),

    details: z
      .string()
      .trim()
      .min(5, { message: "Product Details are required" })
      .optional(),
  }),
});

export const ProductValidation = {
  productValidationSchema,
  updateProductValidationSchema,
};
