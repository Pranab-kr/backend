import express from "express";
import userRouter from "./routes/user.routes.js";
import db from "./db/index.js";
import { userSessions, usersTable } from "./db/schema.js";
import { eq } from "drizzle-orm";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(async (req, res, next) => {
  const sessionId = req.header("session-id");
  if (!sessionId) {
    return next();
  }

  const [data] = await db
    .select({
      sessionId: userSessions.id,
      id: usersTable.id,
      userId: userSessions.userId,
      name: usersTable.name,
      email: usersTable.email,
    })
    .from(userSessions)
    .rightJoin(usersTable, eq(usersTable.id, userSessions.userId))
    .where(eq(sessionId, userSessions.id));

  if (!data) {
    return next();
  }

  req.user = data;
  return next();
});

app.get("/", (req, res) => {
  return res.json({ status: "Server is up" });
});

app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
