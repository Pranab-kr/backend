import express from "express";
import db from "../db/index.js";
import { usersTable } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { randomBytes, createHmac } from "node:crypto";
import jwt from "jsonwebtoken";
import { ensureAuthenticated } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.patch("/", ensureAuthenticated, async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }

  const [updatedUser] = await db
    .update(usersTable)
    .set({ name })
    .where(eq(usersTable.id, user.id))
    .returning({
      name: usersTable.name,
    });

  return res.json({ status: "success", data: updatedUser });
});

//return the current log in user
router.get("/", ensureAuthenticated, async (req, res) => {
  return res.json({ status: "success", data: user });
});

router.post("/signup", async (req, res) => {
  const { name, email, role, password } = req.body;

  const [existngUser] = await db
    .select({
      email: usersTable.email,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (existngUser) {
    return res.status(400).json({ error: `user with ${email} already exist` });
  }

  const salt = randomBytes(256).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  const [user] = await db
    .insert(usersTable)
    .values({ name, email, role, password: hashedPassword, salt })
    .returning({
      id: usersTable.id,
    });

  return res.status(201).json({ status: "success", data: { userId: user.id } });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const [existngUser] = await db
    .select({
      id: usersTable.id,
      email: usersTable.email,
      name: usersTable.name,
      role: usersTable.role,
      salt: usersTable.salt,
      password: usersTable.password,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (!existngUser) {
    return res.status(404).json({ error: `user with ${email} not exists!` });
  }

  const salt = existngUser.salt;
  const existingHash = existngUser.password;

  //password checking
  const newHash = createHmac("sha256", salt).update(password).digest("hex");

  if (newHash !== existingHash) {
    return res.status(400).json({ error: "Incorrect Password" });
  }

  const payload = {
    id: existngUser.id,
    email: existngUser.email,
    name: existngUser.name,
    role: existngUser.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return res.status(200).json({ status: "success Login", token });
});

export default router;
