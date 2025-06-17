import { integer, primaryKey, sqliteTable, text,  } from "drizzle-orm/sqlite-core";
import { relations, eq, and } from 'drizzle-orm';
import { db } from "../db";
import { insumoTable, type InsumoInsert, type InsumoSelect, fornecedorTable, type fornecedorInsert, type fornecedorSelect } from "$lib/server/schema/fornecedor";

async function getAllInsumo (idUser: number) : Promise<{ allInsumo: Array<InsumoSelect> }>{
  try{
    const allInsumo = await db.select().from(insumoTable).where(eq(insumoTable.idUser, idUser));
    return { allInsumo };
  } catch (error) {
    console.error('Erro ao buscar insumos:', error);
  }
  return { allInsumo: [] };
}

async function deleteInsumo (idUser: number, idInsumo: number) : Promise<{ id: number }>{
  try{
    const [idDeletedInsumo] = await db.delete(insumoTable).where(and(eq(insumoTable.id, idInsumo), eq(insumoTable.idUser, idUser))).returning({ id: insumoTable.id });
    return idDeletedInsumo;
  } catch (error) {
    console.error('Erro ao buscar insumos:', error);
  }
  return { id: 0 };
}

async function editInsumo (idUser : number, idInsumo : number, insumo : InsumoInsert) : Promise<{ id: number }> {
  try{
    const [idEditedInsumo] = await db.update(insumoTable).set(insumo).where(and(eq(insumoTable.id, idInsumo), eq(insumoTable.idUser, idUser))).returning({ id: insumoTable.id });
    return idEditedInsumo;
  } catch (error){
    console.error('Erro ao editar insumo:', error);
  }
  return {id : 0}
}

const fornecedoresComInsumos = await db.query.fornecedorTable.findMany({
  with: {
    insumos: {
      with: {
        insumo: true, // Traz os dados do insumo
      },
    },
  },
});

// const insumosDoFornecedor = await db.query.fornecedorInsumo.findMany({
//   where: eq(fornecedorInsumo.fornecedorId, 1),
//   with: {
//     insumo: true,
//   },
// });

// const fornecedoresDoInsumo = await db
//   .select()
//   .from(fornecedorInsumo)
//   .innerJoin(fornecedorTable, eq(fornecedorInsumo.fornecedorId, fornecedorTable.id))
//   .where(eq(fornecedorInsumo.insumoId, 3));
async function addInsumo (insumo : InsumoInsert) : Promise<{ id: number }> {
  try{
    const [idAddedInsumo] = await db.insert(insumoTable).values(insumo).returning({ id: insumoTable.id });
    return idAddedInsumo;
  } catch (error){
    console.error('Erro ao adicionar insumo:', error);
  }
  return {id : 0}
}

export const insumoQueries = {
  getAllInsumo,
  deleteInsumo,
  editInsumo,
  addInsumo
};