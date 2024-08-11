export type TCategory =
  | "Fitness Equipment"
  | "Team Sports Gear"
  | "Outdoor Recreation"
  | "Water Sports"
  | "Cycling"
  | "Golf";

// Define the product type
export type TProduct = {
  productName: string;
  description: string;
  category: TCategory;
  stockQuantity: number;
  brand: string;
  rating: number;
  price: number;
  image: string;
  details: string;
};
