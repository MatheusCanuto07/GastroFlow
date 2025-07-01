import dotenv from "dotenv";

dotenv.config();

export const configDataBase = {
  databaseUrl: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
};