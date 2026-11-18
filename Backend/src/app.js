import http from "http";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path"
import morgan from "morgan"

import userRoutes from "./routes/user.routes.js";

const app = express();

app.use("./uploads", express.static(path.join(import.meta.dirname, "..", "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"))

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", userRoutes);

const server = http.createServer(app);

export default server;
