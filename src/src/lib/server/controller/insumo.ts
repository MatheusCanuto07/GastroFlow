import { db } from "../db";
import { insumoTable, type InsumoInsert, fornecedorTable, type fornecedorInsert, type fornecedorSelect } from "$lib/server/schema/fornecedor";
import { eq } from "drizzle-orm";

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

async function updateFornecedor (fornecedor: fornecedorInsert, id: number): Promise<{ id: number } | { error: string }> {
  try{
    const [result] = await db.update(fornecedorTable)
      .set(fornecedor)
      .where(eq(fornecedorTable.id, id))
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

async function getAllFornecedores (idUSer: number) : Promise<{ allfornecedores: Array<fornecedorSelect> }>{
  try{
    const allfornecedores = await db.select().from(fornecedorTable).where(eq(fornecedorTable.idUser, idUSer));
    return { allfornecedores };
  } catch (error) {
    console.error('Erro ao buscar fornecedores:', error);
  }
  return { allfornecedores: [] };
}

function insertInsumo(insumo : InsumoInsert){
  return db.insert(insumoTable).values(insumo).returning({id : insumoTable.id});
}

export const fornecedorQueries = {
  insertInsumo,
  insertFornecedor,
  updateFornecedor,
  getAllFornecedores,
};