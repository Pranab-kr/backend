import express from "express";
import userRouter from "./routes/user.routes.js";

const app = express();
const PORT = 8000;

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ status: "Server is up" });
});

app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
