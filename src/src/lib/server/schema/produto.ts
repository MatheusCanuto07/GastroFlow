import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const produtoTable = sqliteTable('produto', {
  id: integer('id').primaryKey({autoIncrement : true}),
  nome: text('nome').notNull(),
  unidadeDeMedida: text('unidadeDeMedida').notNull(),
  quantidadeEstoque: integer('quantidadeEstoque').notNull(),
  createdAt: text('created_at').$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').$defaultFn(() => new Date().toISOString()),
  idUser: integer('id_user').notNull(),
})

export type produtoSelect = typeof produtoTable.$inferSelect
export type produtoInsert = typeof produtoTable.$inferInsert