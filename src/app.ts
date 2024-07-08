import cors from "cors";
import express, { Application, Request, Response } from "express";
import { ProductRoutes } from "./app/modules/product/product.route";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/product", ProductRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
// Global Error Handel
app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
