import { Config } from 'drizzle-kit';
import 'dotenv/config';

export default {
  schema: "./src/lib/db/schema",
  out: "./drizzle/",
  driver: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN
  },
  dialect: 'sqlite'
} satisfies Config;