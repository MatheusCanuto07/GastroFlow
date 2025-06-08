import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import {configDataBase} from "../../../config";
// TODO: Olhar esse import
import * as schema from "../server/schema/fornecedor";

const client = createClient({
  url: configDataBase.databaseUrl || "",
  authToken: configDataBase.authToken
});

export const db = drizzle(client, {schema: schema});