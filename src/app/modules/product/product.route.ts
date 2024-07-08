import { Router } from "express";
import { ProductControllers } from "./product.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidation } from "./product.validation";

const router = Router();

//get all Product Router
router.get("/", ProductControllers.getAllProduct);

//create all product router
router.post(
  "/create-product",
  validateRequest(ProductValidation.productValidationSchema),
  ProductControllers.createProduct
);

export const ProductRoutes = router;
