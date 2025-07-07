import { relations, eq, and, like, desc, count } from 'drizzle-orm';
import { db } from "../db";
import { 
  insumoTable, 
  type InsumoInsert, 
  type InsumoSelect,
  insumoFornecedorTable
} from '../schema/insumo'

async function insertInsumo (insumo : InsumoInsert) : Promise<{ id: number }> {
  try {
    const [result]  = await db.insert(insumoTable).values(insumo).returning({ id: insumoTable.id });
    return { id : result.id };
  } catch (error) {
    console.error('Erro ao inserir insumo:', error);
  }
  return { id: 0 };
}

async function updateInsumo (idUser : number, insumo : InsumoInsert) : Promise<{ id: number }> {
  try {
    const [result]  = await db
      .update(insumoTable)
      .set(insumo)
      .where(and(eq(insumoTable.id, insumo.id ?? 1), eq(insumoTable.idUser, idUser)))
      .returning({ id: insumoTable.id });
    return { id : result.id ?? 0 };
  } catch (error) {
    console.error('Erro ao editar insumo:', error);
  }
  return { id: 0 };
}

async function getAllInsumo (idUser: number, searchName : string | null, pageNumber : string | null) : Promise<{ allInsumo: Array<InsumoSelect> }>{
  try{
    const allInsumo = await db
      .select()
      .from(insumoTable)
      .where(and(
        like(insumoTable.name, `%${searchName}%`),
        eq(insumoTable.idUser, idUser)
      ))
      .orderBy(desc(insumoTable.id))
      // .limit(searchName ? 100 : 10)
      // .offset(searchName == null ? pageNumber == null || pageNumber == '1' ? 0 : parseInt(pageNumber) * 5 : 0);
    return { allInsumo };
  } catch (error) {
    console.error('Erro ao buscar insumos:', error);
  }
  return { allInsumo: [] };
}

async function numberOfInsumos(idUser : number) : Promise<{ numberOfInsumos: number }> {
  try{
    const [numberOfInsumos] = await db
      .select({ count: count() })
      .from(insumoTable)
      .where(eq(insumoTable.idUser, idUser));
    return {numberOfInsumos : numberOfInsumos.count};
  } catch (error) {
    console.error('Erro ao buscar insumos:', error);
  }
  return { numberOfInsumos: 0 };
}

async function getInsumosByFornecedorId(fornecedorId: number, idUser : number) {
  try {
    const insumos = await db
      .select({
        insumo: insumoTable, // Todos os campos do insumo
        preco: insumoFornecedorTable.preco, // O preço específico deste fornecedor
      })
      .from(insumoFornecedorTable)
      .innerJoin(
        insumoTable,
        eq(insumoFornecedorTable.insumoId, insumoTable.id)
      )
      .where(
        and(
          eq(insumoFornecedorTable.fornecedorId, fornecedorId),
          eq(insumoFornecedorTable.idUser, idUser)
        )
      )
    return insumos;
  } catch (error) {
    console.error('Erro ao buscar insumos:', error);
  }
}

async function deleteInsumo (idUser: number, idInsumo: number) : Promise<{ id: number }>{
  console.log(idUser, idInsumo)
  try{
    const [idDeletedInsumo] = await db
      .delete(insumoTable)
      .where(and(eq(insumoTable.id, idInsumo), eq(insumoTable.idUser, idUser)))
      .returning({ id: insumoTable.id });
    return{
      id : idDeletedInsumo.id
    };
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

async function addInsumo (insumo : InsumoInsert) : Promise<{ id: number }> {
  try{
    const [idAddedInsumo] = await db.insert(insumoTable).values(insumo).returning({ id: insumoTable.id });
    return idAddedInsumo;
  } catch (error){
    console.error('Erro ao adicionar insumo:', error);
  }
  return {id : 0}
}

async function getInsumoById(idInsumo : number, idUser : number) : Promise<{ insumo : InsumoSelect }> {
  try{
    const [insumo] = await db
      .select()
      .from(insumoTable)
      .where(and(eq(insumoTable.id, idInsumo), eq(insumoTable.idUser, idUser)));
    return { insumo };
  } catch (error){
    console.error('Erro ao buscar insumo:', error);
  }
  return {insumo : {} as InsumoSelect}
}

export const insumoQueries = {
  getAllInsumo,
  deleteInsumo,
  editInsumo,
  addInsumo,
  insertInsumo,
  updateInsumo,
  numberOfInsumos,
  getInsumosByFornecedorId,
  getInsumoById
};