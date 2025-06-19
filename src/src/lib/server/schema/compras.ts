import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { fornecedorTable } from "./fornecedor";

export const comprasTable = sqliteTable('compras',{
  id: integer('id').primaryKey({autoIncrement : true}),
  idFornecedor: integer('idFornecedor').notNull()
    .references(() => fornecedorTable.id, {
      onDelete: 'cascade', 
      onUpdate: 'no action'
    }),
  idInsumo: integer('idInsumo').notNull(),
  date: text('date').notNull(),
  createdAt: text('created_at').$defaultFn(() => new Date().toISOString()),
})