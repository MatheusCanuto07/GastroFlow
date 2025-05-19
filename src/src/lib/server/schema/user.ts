import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";

export const userTable = sqliteTable("user", {
	id: integer("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull()
});

export const usersRelations = relations(userTable, ({ one }) => ({
	userSession: one(sessionTable),
}));

export const sessionTable = sqliteTable("session", {
	id: text("id").primaryKey(),
	userId: integer("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer("expires_at")
    .notNull()
});

export const sessionTableRelations = relations(sessionTable, ({ one }) => ({
	user: one(userTable, { fields: [sessionTable.userId], references: [userTable.id] }),
}));

export type User = InferSelectModel<typeof userTable>;
export type Session = InferSelectModel<typeof sessionTable>;
export type SessionInsert = InferInsertModel<typeof sessionTable>;