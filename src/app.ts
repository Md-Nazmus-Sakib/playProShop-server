import cors from "cors";
import express, { Application, Request, Response } from "express";
import path from "path"; // Import path module
import { ProductRoutes } from "./app/modules/product/product.route";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { OrderRoutes } from "./app/modules/ConfirmOrder/confirmOrder.route";
import { PaymentRoutes } from "./app/modules/payment/payment.route";

const app: Application = express();

// Parsers
app.use(express.json());
app.use(
  cors({
    origin: ["https://play-pro-shop-client.vercel.app"], // Include your local dev URL if needed
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: false, // Handle preflight requests automatically
  })
);

// Application routes
app.use("/", ProductRoutes);
app.use("/", OrderRoutes);
app.use("/", PaymentRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Play Pro Shop Server is Running.");
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Handle React routing, return all requests to React app
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Global Error Handler
app.use(globalErrorHandler);

// Not Found Handler
app.use(notFound);

export default app;
