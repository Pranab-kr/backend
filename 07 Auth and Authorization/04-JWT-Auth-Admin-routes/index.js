import express from "express";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import {
  authenticationMiddleware,
} from "./middlewares/auth.middlewares.js";

const app = express();
const PORT = 8000;

app.use(express.json());

//Middleware to authenticate the user using JWT token
app.use(authenticationMiddleware);

app.get("/", (req, res) => {
  return res.json({ status: "Server is up" });
});

app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
