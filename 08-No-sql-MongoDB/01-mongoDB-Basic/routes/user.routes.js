import express from "express";
import User from "../models/user.model.js";
import { randomBytes, createHmac } from "node:crypto";
import jwt from "jsonwebtoken";
import { ensureAuth } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.patch("/update", ensureAuth, async (req, res) => {

  const { name } = req.body;
  await User.findByIdAndUpdate(req.user._id, {
    name,
  });

  return res.json({ status: "sucess" });
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const salt = randomBytes(256).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  const user = await User.insertOne({
    name,
    email,
    password: hashedPassword,
    salt,
  });

  return res
    .status(201)
    .json({ message: "User created successfully", userId: user._id });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const salt = existingUser.salt;
  const newHashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (newHashedPassword !== existingUser.password) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const payLoad = {
    name: existingUser.name,
    _id: existingUser._id,
    email: existingUser.email,
  };

  const token = jwt.sign(payLoad, process.env.JWT_SECRET, { expiresIn: "1h" });

  return res.status(200).json({ message: "Login successful", token });
});

export default router;
