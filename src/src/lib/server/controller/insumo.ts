import { relations, eq, and } from 'drizzle-orm';
import { db } from "../db";
import { insumoTable, type InsumoInsert, type InsumoSelect } from '../schema/insumo'

async function getAllInsumo (idUser: number) : Promise<{ allInsumo: Array<InsumoSelect> }>{
  try{
    const allInsumo = await db.select().from(insumoTable).where(eq(insumoTable.idUser, idUser));
    return { allInsumo };
  } catch (error) {
    console.error('Erro ao buscar insumos:', error);
  }
  return { allInsumo: [] };
}

async function getAllInsumoFromFornecedor(idUser : number, idFornecedor : number) : 
  Promise<{allInsumosFromFornecedor : Array<InsumoSelect>}>
  {
  try{
    const allInsumosFromFornecedor = 
      await db
        .select()
        .from(insumoTable)
        .where(and(eq(insumoTable.idUser, idUser), eq(insumoTable.idFornecedor, idFornecedor)));
    return { allInsumosFromFornecedor };
  }
  catch{
    console.error('Erro ao buscar insumos:', Error);
  }
  return {allInsumosFromFornecedor : []}
}

async function deleteInsumo (idUser: number, idInsumo: number) : Promise<{ id: number }>{
  try{
    const [idDeletedInsumo] = await db
      .delete(insumoTable)
      .where(and(eq(insumoTable.id, idInsumo)))
      .returning({ id: insumoTable.id });
    return idDeletedInsumo;
  } catch (error) {
    console.error('Erro ao buscar insumos:', error);
  }
  return { id: 0 };
}

async function editInsumo (idUser : number, idInsumo : number, insumo : InsumoInsert) : Promise<{ id: number }> {
  try{
    const [idEditedInsumo] = await db
      .update(insumoTable)
      .set(insumo)
      .where(and(eq(insumoTable.id, idInsumo)))
      .returning({ id: insumoTable.id });
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
        insumo: true,
      },
    },
  },
});

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
  addInsumo,
  getAllInsumoFromFornecedor
};