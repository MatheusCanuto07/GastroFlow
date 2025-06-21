import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const produtoTable = sqliteTable("produto", {
  id: integer("id").primaryKey(),
  quantProdutoGera: integer("quantProdutoGera").notNull(),
  nome: text("nome").notNull(),
  unidadeDeMedida: text("unidadeDeMedida").notNull()
});