import cors from "cors";
import express, { Application, Request, Response } from "express";
import { ProductRoutes } from "./app/modules/product/product.route";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { OrderRoutes } from "./app/modules/ConfirmOrder/confirmOrder.route";
import { PaymentRoutes } from "./app/modules/payment/payment.route";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api", ProductRoutes);
app.use("/api", OrderRoutes);
app.use("/api", PaymentRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
// Global Error Handel
app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
