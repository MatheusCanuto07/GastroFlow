import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { config } from 'dotenv';

import * as schema from "./schema";

config({ path: '.env' });

const client = createClient({
  url: "libsql://default-test-matheuscanuto07.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MzgyNTg2MDYsImlkIjoiYWMwYzE2ZDItM2Q0Yy00ZWZhLWJhNzAtMzY4MWI0ODVhNjJiIn0.s0FuHPoWBGpo-f5yE5io9Tnxl--HrQ6PGINmA0RzgYbjl46lH5KTB7tq33XTs5WeqXf7MUTx0qaJjTQz61gzAw"
});

export const db = drizzle(client, {schema: schema});