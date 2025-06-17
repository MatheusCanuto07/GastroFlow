import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
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

export const fornecedorInsumo = sqliteTable('fornecedor_insumo',{
  id: integer('id').primaryKey({autoIncrement : true}),
  fornecedorId: integer('fornecedor_id')
    .notNull()
    .references(() => fornecedorTable.id, { onDelete: 'cascade' }),
  insumoId: integer('insumo_id')
    .notNull()
    .references(() => insumoTable.id, { onDelete: 'cascade' }),
  preco: integer('preco'), 
  createdAt: text('created_at').$defaultFn(() => new Date().toISOString()),
  idUser: integer('id_user').notNull(),
  }
);

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
  insumos: many(fornecedorInsumo),
}));

export const insumoRelationsWithFornecedor = relations(insumoTable, ({ many }) => ({
  fornecedores: many(fornecedorInsumo),
  // outras relações...
}));

export const fornecedorInsumoRelations = relations(fornecedorInsumo, ({ one }) => ({
  fornecedor: one(fornecedorTable, {
    fields: [fornecedorInsumo.fornecedorId],
    references: [fornecedorTable.id],
  }),
  insumo: one(insumoTable, {
    fields: [fornecedorInsumo.insumoId],
    references: [insumoTable.id],
  }),
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
