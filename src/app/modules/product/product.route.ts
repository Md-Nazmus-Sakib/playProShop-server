import { Router } from "express";
import { ProductControllers } from "./product.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidation } from "./product.validation";

const router = Router();

//get all Product Router
router.get("/product", ProductControllers.getAllProduct);

//get all Product Query Router
router.get("/query", ProductControllers.getAllProductQuery);

//get single product Router
router.get("/product/:id", ProductControllers.getSingleProductInfo);

//create all product router
router.post(
  "/create-product",
  validateRequest(ProductValidation.productValidationSchema),
  ProductControllers.createProduct
);

//delete product by id router
router.delete("/:id", ProductControllers.deleteProduct);

export const ProductRoutes = router;
