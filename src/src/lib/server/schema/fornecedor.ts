import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from 'drizzle-orm';
import { insumoTable } from "../schema/insumo";
import {comprasTable} from "../schema/compras"

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

export const fornecedorRelations = relations(fornecedorTable, ({ many }) => ({
  insumos: many(fornecedorInsumo),
}));

export const insumoRelationsWithFornecedor = relations(insumoTable, ({ many }) => ({
  fornecedores: many(fornecedorInsumo),
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

export const comprasRelations = relations(comprasTable, ({ one }) => ({
  fornecedor: one(fornecedorTable, {
    fields: [comprasTable.idFornecedor],
    references: [fornecedorTable.id],
  }),
  insumo: one(insumoTable, {
    fields: [comprasTable.idInsumo],
    references: [insumoTable.id],
  }),
}));
