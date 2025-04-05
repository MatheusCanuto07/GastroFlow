import dotenv from "dotenv";

// Carrega as variáveis do .env
dotenv.config();

export const configDataBase = {
  databaseUrl: process.env.url || "",
  authToken: process.env.authToken || "",
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
};
