import express, { Application } from "express";
import userRoutes from "./routes/userRoutes";
import organizationRoutes from "./routes/organizationRoutes";
import itemRoutes from "./routes/itemRoutes";
import { AppDataSource } from "./data-source";
import swaggerSetup from "./swagger";
import { authenticateToken } from "../src/middleware/middleware";

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/auth", userRoutes);
app.use("/organization", authenticateToken, organizationRoutes);
app.use("/item", authenticateToken, itemRoutes);
app.use(swaggerSetup);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  }
);

async function startServer() {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error during Data Source initialization:", error);
  }
}

startServer();

export default app;
