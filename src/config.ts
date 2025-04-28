import dotenv from "dotenv";

dotenv.config();

console.log(process.env.DATABASE_URL, process.env.DATABASE_AUTH_TOKEN);

export const configDataBase = {
  databaseUrl: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
};