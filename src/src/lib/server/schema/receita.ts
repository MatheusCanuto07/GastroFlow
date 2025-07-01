import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const receitaTable = sqliteTable("receita", {
	id: integer("id").primaryKey(),
  idProduto: integer("idProduto").notNull(),
  quantProdutoGera: integer("quantProdutoGera").notNull(),
  nome: text("nome").notNull(),
  unidadeDeMedida: text("unidadeDeMedida").notNull(),
  idUser: integer("id_user").notNull(),
  descricao: text("descricao").notNull()
});

export const insumosReceita = sqliteTable("insumos_receita", {
  id: integer("id").primaryKey(),
  idReceita: integer("idReceita")
    .notNull()
    .references(() => receitaTable.id, { onDelete: 'cascade' }),
  idInsumo: integer("idInsumo").notNull(),
  quantidade: integer("quantidade").notNull()
})

export type receitaSelect = typeof receitaTable.$inferSelect;
export type receitaInsert = typeof receitaTable.$inferInsert;