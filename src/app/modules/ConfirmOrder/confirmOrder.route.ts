import { Router } from "express";
import { OrderControllers } from "./confirmOrder.controller";

const router = Router();

//create Order router
router.post("/submitOrder", OrderControllers.createOrder);

// Get orders by email route
router.get("/orders/:email", OrderControllers.getOrderByEmail);

export const OrderRoutes = router;
