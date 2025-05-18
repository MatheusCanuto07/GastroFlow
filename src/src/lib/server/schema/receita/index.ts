import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const receita = sqliteTable("receita", {
	id: integer("id").primaryKey(),
  idProduto: integer("idProduto").notNull(),
  quantProdutoGera: integer("quantProdutoGera").notNull(),
  nome: text("nome").notNull(),
  unidadeDeMedida: text("unidadeDeMedida").notNull()
});