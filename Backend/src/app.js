import http from "http";
import express from "express";
import routes from "./routes/routeIndex.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// All API Routes
app.use("/api", routes);

// HTTP Server
const server = http.createServer(app);

export default server;