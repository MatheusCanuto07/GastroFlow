import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from 'drizzle-orm';

export const fornecedorTable = sqliteTable('fornecedor', {
  id: integer('id').primaryKey({autoIncrement : true}),
  name : text('name').notNull(),
  contato: text('contato'),
  telefone: text('telefone').notNull(),
  tipo: text('tipo'),
  email: text('email').notNull().unique(),
  status: text('status').notNull(),
  createdAt: text('created_at').$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').$defaultFn(() => new Date().toISOString()),
  idUser: integer('id_user').notNull(),
});

export type fornecedorSelect = typeof fornecedorTable.$inferSelect;
export type fornecedorInsert = typeof fornecedorTable.$inferInsert;

export const insumoTable = sqliteTable('insumo', {
  id: integer('id').primaryKey({autoIncrement : true}),
  idFornecedor: integer('idFornecedor').notNull(),
  nome : text('nome').notNull(),
  categoria: text('categoria'),
  dataValidade: text('dataValidade').notNull(),
  quantidadeDisponivel: text('quantidadeDisponivel').notNull(),
  createdAt: text('created_at').$defaultFn(() => new Date().toISOString()),
  idUser: integer('id_user').notNull(),
});

export type InsumoSelect = typeof insumoTable.$inferSelect;
export type InsumoInsert = typeof insumoTable.$inferInsert;

export const compras = sqliteTable('compras',{
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

export const fornecedorRelations = relations(fornecedorTable, ({ many }) => ({
  compras: many(compras),
  insumos: many(insumoTable),
}));

export const comprasRelations = relations(compras, ({ one }) => ({
  fornecedor: one(fornecedorTable, {
    fields: [compras.idFornecedor],
    references: [fornecedorTable.id],
  }),
  insumo: one(insumoTable, {
    fields: [compras.idInsumo],
    references: [insumoTable.id],
  }),
}));

export const insumoRelations = relations(insumoTable, ({ one, many }) => ({
  fornecedor: one(fornecedorTable, {
    fields: [insumoTable.idFornecedor],
    references: [fornecedorTable.id],
  }),
  compras: many(compras),
}));
