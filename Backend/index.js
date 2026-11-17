import dotenv from "dotenv";
dotenv.config();

import server from "./src/app.js";
import connectTODb from "./src/config/db.js";

connectTODb();

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log("Server Started", {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
  });
});
