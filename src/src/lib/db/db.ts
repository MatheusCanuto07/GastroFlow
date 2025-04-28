import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import {configDataBase} from "../../../config";
import * as schema from "./schema";

const client = createClient({
  url: configDataBase.databaseUrl || "",
  authToken: configDataBase.authToken
});

export const db = drizzle(client, {schema: schema});