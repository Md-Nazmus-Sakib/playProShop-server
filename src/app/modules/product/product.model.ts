import { model, Schema } from "mongoose";
import { TProduct } from "./product.interface";

// Define the schema for the Product model
const productSchema = new Schema<TProduct>(
  {
    productName: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [50, "Product name must be at most 50 characters long"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [200, "Description must be at most 200 characters long"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Fitness Equipment",
        "Team Sports Gear",
        "Outdoor Recreation",
        "Water Sports",
        "Cycling",
        "Golf",
      ],
      trim: true,
    },
    stockQuantity: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock quantity must be at least 0"],
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
      max: [50, "Brand must be at most 50 characters long"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [0, "Rating must be at least 0"],
      max: [5, "Rating must be at most 5"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be at least 0"],
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
      validate: {
        validator: function (v: string) {
          return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    details: {
      type: String,
      required: [true, "Product details are required"],
      max: [1000, "Product details must be at most 1000 characters long"],
    },
  },
  {
    timestamps: true,
  }
);

// Create the Product model
export const Product = model<TProduct>("Product", productSchema);
