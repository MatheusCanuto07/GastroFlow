import { Config } from 'drizzle-kit';
import 'dotenv/config';
import { configDataBase } from './config';

console.log(configDataBase)

export default {
  schema: "./src/lib/server/db/schema/index.ts",
  out: "./drizzle/",
  driver: "turso",
  dbCredentials: {
    url: configDataBase.databaseUrl || "",
    authToken: configDataBase.authToken || ""
  },
  dialect: 'sqlite'
} satisfies Config;