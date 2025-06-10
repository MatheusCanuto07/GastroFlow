import { db } from "../db";
import { insumoTable, type InsumoInsert, fornecedorTable, type fornecedorInsert } from "$lib/server/schema/fornecedor";


function insertInsumo(insumo : InsumoInsert){
  return db.insert(insumoTable).values(insumo).returning({id : insumoTable.id});
}

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

export const fornecedorQueries = {
  insertInsumo,
  insertFornecedor,
  
};