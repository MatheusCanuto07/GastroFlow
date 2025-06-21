import { db } from "../db";
import { produtoTable, type produtoSelect, type produtoInsert } from "$lib/server/schema/produto";
import { eq, and, desc, like, count, sql } from "drizzle-orm";

export async function insertProduto(produto: produtoInsert) {
  try {
    const [newProduto] = await db.insert(produtoTable).values(produto).returning();
    return newProduto;
  } catch (error) {
    console.error('Erro ao inserir produto:', error);
  }
  return null;
}

export async function getAllProdutos(
  idUser: number, 
  searchName: string | null = null, 
  pageNumber: string | null = null
) {
  try {
    const allProdutos = await db
      .select()
      .from(produtoTable)
      .where(and(
        like(produtoTable.nome, `%${searchName ?? ''}%`),
        eq(produtoTable.idUser, idUser)
      ))
      .orderBy(desc(produtoTable.id))
      .limit(searchName ? 100 : 10)
      .offset(searchName == null ? pageNumber == null || pageNumber == '1' ? 0 : parseInt(pageNumber) * 5 : 0);
    
    return { allProdutos };
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
  }
  return { allProdutos: [] };
}

export async function numberOfProdutos(idUser: number) {
  try {
    const [numberOfProdutos] = await db
      .select({ count: count() })
      .from(produtoTable)
      .where(eq(produtoTable.idUser, idUser));
    return { numberOfProdutos: numberOfProdutos.count };
  } catch (error) {
    console.error('Erro ao contar produtos:', error);
  }
  return { numberOfProdutos: 0 };
}

export async function getProdutoById(id: number, idUser: number) {
  try {
    const [produto] = await db
      .select()
      .from(produtoTable)
      .where(and(
        eq(produtoTable.id, id),
        eq(produtoTable.idUser, idUser)
      ));
    return { produto };
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
  }
  return { produto: {} as produtoSelect };
}

export async function updateProduto(produto: produtoInsert, idUser: number) {
  try {
    const [result] = await db
      .update(produtoTable)
      .set({
        ...produto,
        updatedAt: new Date().toISOString()
      })
      .where(and(
        eq(produtoTable.id, produto.id ?? 0),
        eq(produtoTable.idUser, idUser)
      ))
      .returning({ id: produtoTable.id });
    return { id: result.id };
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
  }
  return { id: 0 };
}

export async function excludeProduto(idProduto: number, idUser: number) {
  try {
    const [result] = await db
      .delete(produtoTable)
      .where(and(
        eq(produtoTable.id, idProduto),
        eq(produtoTable.idUser, idUser)
      ))
      .returning({ id: produtoTable.id });
    return { id: result.id };
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
  }
  return { id: 0 };
}

export async function incrementaProduto(
  idProduto: number, 
  idUser: number, 
  quantidade: number
) {
  try {
    const [result] = await db
      .update(produtoTable)
      .set({
        quantidadeEstoque: sql`${produtoTable.quantidadeEstoque} + ${quantidade}`,
        updatedAt: new Date().toISOString()
      })
      .where(and(
        eq(produtoTable.id, idProduto),
        eq(produtoTable.idUser, idUser)
      ))
      .returning({ id: produtoTable.id });
    return { id: result.id };
  } catch (error) {
    console.error('Erro ao incrementar produto:', error);
  }
  return { id: 0 };
}

export async function decrementaProduto(
  idProduto: number, 
  idUser: number, 
  quantidade: number
) {
  try {
    const { produto } = await getProdutoById(idProduto, idUser);
    if (produto.quantidadeEstoque < quantidade) {
      throw new Error('Quantidade insuficiente em estoque');
    }

    const [result] = await db
      .update(produtoTable)
      .set({
        quantidadeEstoque: sql`${produtoTable.quantidadeEstoque} - ${quantidade}`,
        updatedAt: new Date().toISOString()
      })
      .where(and(
        eq(produtoTable.id, idProduto),
        eq(produtoTable.idUser, idUser)
      ))
      .returning({ id: produtoTable.id });
    return { id: result.id };
  } catch (error) {
    console.error('Erro ao decrementar produto:', error);
    throw error;
  }
}