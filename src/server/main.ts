import express from "express";
import ViteExpress from "vite-express";
import http from "http";

import { initSockets } from "./sockets";

const app = express();
const server = http.createServer(app);

// Initialize sockets
initSockets(server);

app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000...");
});

ViteExpress.bind(app, server);
