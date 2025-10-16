import express from "express";
import userRouter from "./routes/user.routes.js";
import JWT from "jsonwebtoken";

const app = express();
const PORT = 8000;

app.use(express.json());

//Middleware to authenticate the user using JWT token
app.use(async (req, res, next) => {

  try {
      //Header authorization: Bearer <token>
  const tokenHeader = req.headers["authorization"];

  if (!tokenHeader) {
    return next();
  }

  if(!tokenHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Invalid token format" });
  }

  const token = tokenHeader.split(" ")[1];

  const decoded = JWT.verify(token, process.env.JWT_SECRET);

  req.user = decoded;

  next();
  } catch (error) {
    next()
  }

});

app.get("/", (req, res) => {
  return res.json({ status: "Server is up" });
});

app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
