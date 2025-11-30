import express from "express";
import http from "http";
import path from "path"
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const PORT = 8000;

const io = new Server(server);

app.use(express.json());
app.use(express.static(path.resolve("./public")));

io.on("connection", (socket) => {
  socket.on("user-message", (data) => {
    io.emit("receive-message", data);
  });
});

app.get("/", (req, res) => {
  res.sendFile("/public/index.html");
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
