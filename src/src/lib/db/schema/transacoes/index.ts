import { relations } from "drizzle-orm";
import { sqliteTable, int, text, real, integer, primaryKey } from "drizzle-orm/sqlite-core";

// Fazer uma tabela de usuário com o saldo atual
export const usuarioTable = sqliteTable("usuarioTable", {
  id: int("id").primaryKey(),
  nome: text("nome").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  saldo: integer("saldo").notNull(),
});

export const userRelations = relations(usuarioTable, ({ many }) => ({
  transactios : many(transactionsTable),
  categorias : many(userCategory),
}))

export const transactionsTable = sqliteTable("transactionsTable", {
  id: int("id").primaryKey(),
  banco: text("banco"),
  tipo: text("tipo").notNull(),
  data: text("data").notNull(),
  valor: integer("valor").notNull(),
  formaPagamento : text("formaPagamento").notNull(),
  categoria: text("categoria").notNull(),
  recorrencia: integer("recorrencia"),
  dataRecorrencia: integer("dataRecorrencia"),
  descricao: text("descricao"),
  idUsuario: integer("idUsuario").notNull(),
});

export const transactionRelations = relations(transactionsTable, ({ one }) => ({
  user: one(usuarioTable, {
    fields: [transactionsTable.idUsuario],
    references: [usuarioTable.id],
  }),
}))

export type transactionsTable = typeof transactionsTable.$inferInsert;
export type usuarioTable = typeof usuarioTable.$inferInsert;
export type userCategory = typeof userCategory.$inferInsert;

export const userCategory = sqliteTable("userCategoryTable", {
  id: int("id").primaryKey(),
  name: text("name").notNull(),
  idUser: int("idUser").notNull(),
})

export const userCategoryRelations = relations(userCategory, ({ one }) => ({
  user: one(usuarioTable, {
    fields: [userCategory.idUser],
    references: [usuarioTable.id],
  }),
}))
