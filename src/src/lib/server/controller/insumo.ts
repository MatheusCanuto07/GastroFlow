import { integer, primaryKey, sqliteTable, text,  } from "drizzle-orm/sqlite-core";
import { relations, eq } from 'drizzle-orm';
import { db } from "../db";
import { insumoTable, type InsumoInsert, type InsumoSelect, fornecedorTable, type fornecedorInsert, type fornecedorSelect, fornecedorInsumo } from "$lib/server/schema/fornecedor";

// async function insertFornecedorInsumo() await db.insert(fornecedorInsumo).values({
//   fornecedorId: 1,
//   insumoId: 5,
//   preco: 1250,
//   createdAt : new Date().toISOString(),
//   idUser : 1,
// });

// Buscar fornecedores com seus insumos
const fornecedoresComInsumos = await db.query.fornecedorTable.findMany({
  with: {
    insumos: {
      with: {
        insumo: true, // Traz os dados do insumo
      },
    },
  },
});

// Buscar insumos de um fornecedor específico
const insumosDoFornecedor = await db.query.fornecedorInsumo.findMany({
  where: eq(fornecedorInsumo.fornecedorId, 1),
  with: {
    insumo: true,
  },
});

const fornecedoresDoInsumo = await db
  .select()
  .from(fornecedorInsumo)
  .innerJoin(fornecedorTable, eq(fornecedorInsumo.fornecedorId, fornecedorTable.id))
  .where(eq(fornecedorInsumo.insumoId, 3));

