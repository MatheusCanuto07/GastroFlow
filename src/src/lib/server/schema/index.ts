import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from 'drizzle-orm';

export const fornecedor = sqliteTable('fornecedor', {
  id: integer('id').primaryKey(),
  name : text('name').notNull(),
  contato: text('contato').notNull(),
  tipo: text('tipo').notNull(),
  email: text('email').notNull().unique(),
  status: text('status').notNull(),
  createdAt: text('created_at').$defaultFn(() => new Date().toISOString()),
});

export const insumo = sqliteTable('insumo', {
  id: integer('id').primaryKey(),
  idFornecedor: integer('idFornecedor').notNull(),
  nome : text('nome').notNull(),
  categoria: text('categoria'),
  dataValidade: text('dataValidade').notNull(),
  quantidadeDisponivel: text('quantidadeDisponivel').notNull(),
  createdAt: text('created_at').$defaultFn(() => new Date().toISOString()),
});

export const compras = sqliteTable('compras',{
  id: integer('id').primaryKey(),
  idFornecedor: integer('idFornecedor').notNull()
    .references(() => fornecedor.id, {
      onDelete: 'cascade', 
      onUpdate: 'no action'
    }),
  idInsumo: integer('idInsumo').notNull(),
  date: text('date').notNull(),
  createdAt: text('created_at').$defaultFn(() => new Date().toISOString()),
})

export const fornecedorRelations = relations(fornecedor, ({ many }) => ({
  compras: many(compras),
  insumos: many(insumo),
}));

export const comprasRelations = relations(compras, ({ one }) => ({
  fornecedor: one(fornecedor, {
    fields: [compras.idFornecedor],
    references: [fornecedor.id],
  }),
  insumo: one(insumo, {
    fields: [compras.idInsumo],
    references: [insumo.id],
  }),
}));

export const insumoRelations = relations(insumo, ({ one, many }) => ({
  fornecedor: one(fornecedor, {
    fields: [insumo.idFornecedor],
    references: [fornecedor.id],
  }),
  compras: many(compras),
}));
