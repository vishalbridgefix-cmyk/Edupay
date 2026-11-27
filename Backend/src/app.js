import http from "http";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import morgan from "morgan";

import routes from "./routes/index.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));

// Static uploads folder
app.use("/uploads", express.static(path.join(import.meta.dirname, "..", "uploads")));

// All API Routes
app.use("/api", routes);

// HTTP Server
const server = http.createServer(app);

export default server;
