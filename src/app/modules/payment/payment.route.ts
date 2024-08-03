import { Router } from "express";
import { PaymentControllers } from "./payment.controller";

const router = Router();

//create Order router
router.post("/create-payment-intent", PaymentControllers.createPayment);

export const PaymentRoutes = router;
