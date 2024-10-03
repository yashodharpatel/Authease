import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/dbConnection";
import { router } from "./routes/auth";

if (
  typeof process !== "undefined" &&
  process.release &&
  process.release.name === "node"
) {
  connectDB();

  dotenv.config();
  const app = express();
  const PORT = process.env.PORT || 8080;

  app.use(cors());

  app.use(express.json());

  app.use("/auth", router);

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
}
