import express from "express";
import cors from "cors";
import "dotenv/config";
import job from "./lib/cron.js";

import authRoutes from "../src/routes/authRoutes.js";
import bookRoutes from "../src/routes/bookRoutes.js";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

// job.start();
if (process.env.NODE_ENV === "production") job.start();
app.use(express.json());
app.use(cors());

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Sever is running on Port ${PORT}`);
  connectDB();
});
