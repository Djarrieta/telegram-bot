import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
	id: text("id").primaryKey(),
	name: text("name"),
});

export const notes = sqliteTable("notes", {
	id: integer("id").primaryKey(),
	description: text("description"),
	userId: text("userId")
		.notNull()
		.references(() => users.id),
});
