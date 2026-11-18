
import http from "http";
import express from "express";

import courseRoutes from "./routes/course.routes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}))

// Course Routes
app.use("/api/courses", courseRoutes);

// HTTP Server
const server = http.createServer(app);

export default server;
