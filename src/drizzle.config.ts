import { Config, defineConfig } from 'drizzle-kit';
import 'dotenv/config';
import { configDataBase } from './config';

export default defineConfig({
  schema: "./src/lib/server/schema/schema.ts",
  out: "./drizzle/",
  driver: "turso",
  dbCredentials: {
    url: configDataBase.databaseUrl || "",
    authToken: configDataBase.authToken || ""
  },
  dialect: 'sqlite'
}) satisfies Config;