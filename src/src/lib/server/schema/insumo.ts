import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const insumoTable = sqliteTable('insumo', {
  id: integer('id').primaryKey({autoIncrement : true}),
  idFornecedor : integer('idFornecedor'),
  name : text('name').notNull(),
  categoria: text('categoria'),
  dataValidade: text('dataValidade').notNull(),
  quantidadeEstoque: integer('quantidadeEstoque').notNull(),
  custo: integer('custo').notNull(),
  createdAt: text('created_at').$defaultFn(() => new Date().toISOString()),
  idUser: integer('id_user').notNull(),
});

export type InsumoSelect = typeof insumoTable.$inferSelect;
export type InsumoInsert = typeof insumoTable.$inferInsert;