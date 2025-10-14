const { pgTable, varchar, uuid} = require("drizzle-orm/pg-core")

const authorTable = pgTable("authors", {
  id: uuid().primaryKey().defaultRandom(),
  firstName: varchar({ length: 50 }).notNull(),
  lastName: varchar({length: 50}) || null,
  email: varchar({ length: 255 }).notNull().unique(),
});

module.exports = authorTable;
