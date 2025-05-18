import { db } from "../db";
import { userTable } from "$lib/server/schema";
import { eq } from "drizzle-orm";

type userModel = typeof userTable.$inferSelect;
type userInsert = typeof userTable.$inferInsert;

function getUserByEmail(userEmail : userModel["email"]) {
  return db.select().from(userTable).where(eq(userTable.email, userEmail)).limit(1);
}

function insertUser(user : userInsert){
  return db.insert(userTable).values(user).returning({id : userTable.id})
}

export const userQueries = {
  getUserByEmail,
  insertUser
};