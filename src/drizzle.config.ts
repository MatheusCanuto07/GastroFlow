import { Config } from 'drizzle-kit';
import 'dotenv/config';
import { configDataBase } from './config';

export default {
  schema: "./src/lib/db/schema",
  out: "./drizzle/",
  driver: "turso",
  dbCredentials: {
    url: configDataBase.databaseUrl,
    authToken: configDataBase.authToken
  },
  dialect: 'sqlite'
} satisfies Config;