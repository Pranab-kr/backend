const db = require("./db/index");
const { userTable } = require("./drizzle/schema.js");
// require("dotenv/config")


async function getAllUser() {
  const user = await db.select().from(userTable);

  console.log("user in db", user);
  return user;
}

async function createUser({ id, name, email }) {
  await db.insert(userTable).values({ id, name, email });
}

// createUser({ id: 1, name: "pranab", email: "pranabm@gmail.com" });
// createUser({ id: 2, name: "ram", email: "ram@gmail.com" });
getAllUser();
