import { pgTable, unique, check, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: uuid().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	password: text().notNull(),
	salt: text().notNull(),
}, (table) => [
	unique("users_email_unique").on(table.email),
	check("users_id_not_null", sql`NOT NULL id`),
	check("users_name_not_null", sql`NOT NULL name`),
	check("users_email_not_null", sql`NOT NULL email`),
	check("users_password_not_null", sql`NOT NULL password`),
	check("users_salt_not_null", sql`NOT NULL salt`),
]);

export const userSessions = pgTable("user_sessions", {
	id: uuid().primaryKey().notNull(),
	userId: uuid().notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	check("user_sessions_id_not_null", sql`NOT NULL id`),
	check("user_sessions_userId_not_null", sql`NOT NULL "userId"`),
	check("user_sessions_createdAt_not_null", sql`NOT NULL "createdAt"`),
]);
