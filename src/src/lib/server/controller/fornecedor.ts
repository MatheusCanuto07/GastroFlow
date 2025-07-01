import { db } from "../db";
import { fornecedorTable, type fornecedorInsert, type fornecedorSelect } from "$lib/server/schema/fornecedor";
import { 
  insumoTable, 
  type InsumoInsert, 
  type InsumoSelect,
  insumoFornecedorTable 
} from '$lib/server/schema/insumo'
import { eq, and, desc, like, count } from "drizzle-orm";

async function insertFornecedor(fornecedor: fornecedorInsert): Promise<{ id: number } | { error: string }> {
  try {
    const [result] = await db.insert(fornecedorTable)
      .values(fornecedor)
      .returning({ id: fornecedorTable.id });

    if (!result) {
      throw new Error('Nenhum registro retornado após inserção');
    }

    return result;
  } catch (error) {
    console.error('Erro ao inserir fornecedor:', error);
    
    if (error instanceof Error) {
      if ('code' in error && error.code === 'SQLITE_CONSTRAINT') {
        return { error: 'Fornecedor já cadastrado' };
      }
      
      return { error: error.message };
    }

    return { error: 'Erro desconhecido ao cadastrar fornecedor' };
  }
}

async function updateFornecedor (fornecedor: fornecedorInsert, id: string): Promise<{ id: number } | { error: string }> {
  try{
    const [result] = await db.update(fornecedorTable)
      .set(fornecedor)
      .where(eq(fornecedorTable.id, parseInt(id)))
      .returning({ id: fornecedorTable.id });

    if(!result){
      throw new Error('Nenhum registro retornado depois da edição');
    }
    return result;

  } catch (error) {
    console.error('Erro ao editar fornecedor:', error);
    if (error instanceof Error) {
      if ('code' in error && error.code === 'SQLITE_CONSTRAINT') {
        return { error: 'Fornecedor já cadastrado' };
      }
      return { error: error.message };
    }
  }
  return { error: 'Erro desconhecido ao cadastrar fornecedor'};
}

async function getAllFornecedores(
  idUser: number,
  searchName: string | null,
  pageNumber: string | null,
  status: string | null
): Promise<{ allfornecedores: Array<fornecedorSelect> }> {
  try {
    const limit = searchName ? 100 : 10; 
    const page = pageNumber ? Math.max(1, parseInt(pageNumber)) : 1;
    const offset = (page - 1) * limit;

    const allfornecedores = await db
      .select()
      .from(fornecedorTable)
      .where(
        and(
          searchName ? like(fornecedorTable.name, `%${searchName}%`) : undefined,
          eq(fornecedorTable.status, status ?? 'ativo'),
          eq(fornecedorTable.idUser, idUser)
        )
      )
      .orderBy(desc(fornecedorTable.id))
      // .limit(limit)
      // .offset(offset);

    return { allfornecedores };
  } catch (error) {
    console.error('Erro ao buscar fornecedores:', error);
    return { allfornecedores: [] };
  }
}

async function getInsumosByFornecedorId(fornecedorId: number) {
  const insumos = await db
    .select({
      insumo: insumoTable,
      preco: insumoFornecedorTable.preco, 
    })
    .from(insumoFornecedorTable)
    .innerJoin(
      insumoTable,
      eq(insumoFornecedorTable.insumoId, insumoTable.id)
    )
    .where(
      eq(insumoFornecedorTable.fornecedorId, fornecedorId)
    )
    .execute();

  return insumos;
}

async function numberOfFornecedores(idUser : number) : Promise<{ numberOfFornecedores: number }> {
  try{
    const [numberOfFornecedores] = await db
      .select({ count: count() })
      .from(fornecedorTable)
      .where(eq(fornecedorTable.idUser, idUser));
    return {numberOfFornecedores : numberOfFornecedores.count};
  } catch (error) {
    console.error('Erro ao buscar fornecedores:', error);
  }
  return { numberOfFornecedores: 0 };
}

async function getAllInsumosFromFornecedor (id : number, idUser : number) : Promise<{allInsumos : Array<InsumoSelect>}>{
  try{
    const allInsumos = await db.select().from(insumoTable).where(eq(insumoTable.idUser, idUser));
    return { allInsumos };
  } catch (error) {
    console.error('Erro ao buscar insumos:', error);
  }
  return {allInsumos : []}
}

async function getFornecedorById(id : number, idUser : number) : Promise<{fornecedor : fornecedorSelect}> {
  try{
    const [fornecedor] = await db
      .select()
      .from(fornecedorTable)
      .where(and(eq(fornecedorTable.idUser, idUser), eq(fornecedorTable.id, id)));
    return {
      fornecedor : fornecedor
    };
  } catch (error) {
    console.error('Erro ao buscar insumos:', error);
  }
  return {fornecedor : {} as fornecedorSelect}
}

async function deleteFornecedor(id: number, idUser : number) : Promise<{ id: number }> {
  try{
    const [idDeletedFornecedor] = await db
      .delete(fornecedorTable)
      .where(and(eq(fornecedorTable.id, id), eq(fornecedorTable.idUser, idUser)))
      .returning({ id: fornecedorTable.id });
    return {
      id : idDeletedFornecedor.id
    };
  } catch (error) {
    console.error('Erro ao buscar insumos:', error);
  }
  return { id: 0 };
}

export const fornecedorQueries = {
  insertFornecedor,
  updateFornecedor,
  getAllFornecedores,
  getAllInsumosFromFornecedor,
  getFornecedorById,
  numberOfFornecedores,
  deleteFornecedor
};