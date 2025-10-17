import express from "express";
import "dotenv/config";
import { connectMongoDB } from "./connection.js";
import userRouter from "./routes/user.routes.js";
import { authMiddleware } from "./middlewares/auth.middlewares.js";

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());

app.use(authMiddleware)

connectMongoDB(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/", (req, res) => {
  res.send("server is up and running");
});

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
