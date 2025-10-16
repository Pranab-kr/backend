import express from "express";
import db from "../db/index.js";
import { usersTable } from "../db/schema.js";
import { ensureAuthenticated , ensureAdmin} from "../middlewares/auth.middlewares.js";
const router = express.Router();

const adminRestrict = ensureAdmin("admin");

router.use(ensureAuthenticated);
router.use(adminRestrict);

router.get("/users", async (req, res) => {
  const users = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
    })
    .from(usersTable);

  res.json(users);
});

export default router;
