import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const insumoTable = sqliteTable('insumo', {
  id: integer('id').primaryKey({autoIncrement : true}).notNull(),
  idFornecedor : integer('idFornecedor'),
  name : text('name').notNull(),
  categoria: text('categoria'),
  dataValidade: text('dataValidade').notNull(),
  quantidadeEstoque: integer('quantidadeEstoque').notNull(),
  custo: integer('custo').notNull(),
  createdAt: text('created_at').$defaultFn(() => new Date().toISOString()),
  idUser: integer('id_user').notNull(),
});

export const insumoFornecedorTable = sqliteTable('insumo_fornecedor', {
  id: integer('id').primaryKey({autoIncrement : true}),
  insumoId: integer('insumo_id')
    .notNull()
    .references(() => insumoTable.id, { onDelete: 'cascade' }),
  fornecedorId: integer('fornecedor_id')
    .notNull()
    .references(() => insumoTable.id, { onDelete: 'cascade' }),
  preco: integer('preco'), 
  createdAt: text('created_at').$defaultFn(() => new Date().toISOString()),
  idUser: integer('id_user').notNull(),
})

export type InsumoSelect = typeof insumoTable.$inferSelect;
export type InsumoInsert = typeof insumoTable.$inferInsert;