import http from "http";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import morgan from "morgan";

//Swagger import
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from "./config/swagger.js";

import routes from "./routes/index.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));

// Static uploads folder
app.use("/uploads", express.static(path.join(import.meta.dirname, "..", "uploads")));

//for swagger docs
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec))

// All API Routes
app.use("/api", routes);

// HTTP Server
const server = http.createServer(app);

export default server;
