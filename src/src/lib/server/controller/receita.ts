import { db } from "../db";
import { 
  receitaTable, 
  type receitaInsert, 
  type receitaSelect,
  insumosReceita
} from "$lib/server/schema/receita";
import { eq, and, desc, like, count, sql } from "drizzle-orm";
import { insumoTable } from "../schema/insumo";
import { produtoTable } from "../schema/produto";

export async function insertReceita(receita : receitaInsert){
  try{
    const [newReceita] = await db.insert(receitaTable).values(receita).returning();
    return newReceita;
  } catch (error){
    console.error('Erro ao inserir receita:', error);
  }
  return null;
}

export async function getAllReceitas(idUser : number, searchName : string | null, pageNumber : string | null){
  try{
    const allReceitas = await db
      .select({
        receitas : receitaTable,
        nomeProdutoGera : produtoTable.nome
      })
      .from(receitaTable)
      .innerJoin(produtoTable, eq(receitaTable.idProduto, produtoTable.id))
      .where(and(
        like(receitaTable.nome, `%${searchName}%`),
        eq(receitaTable.idUser, idUser)
      ))
      .orderBy(desc(receitaTable.id))
      .limit(searchName ? 100 : 10)
      .offset(searchName == null ? pageNumber == null || pageNumber == '1' ? 0 : parseInt(pageNumber) * 5 : 0);
    return { allReceitas }
  } catch (error) {
    console.error('Erro ao buscar receitas:', error);
  }
  return { allReceitas : [] }
}

export async function numberOfReceitas(idUser : number){
  try{
    const [numberOfReceitas] = await db
      .select({ count: count() })
      .from(receitaTable)
      .where(eq(receitaTable.idUser, idUser));
    return {numberOfReceitas : numberOfReceitas.count};
  } catch (error) {
    console.error('Erro ao buscar receitas:', error);
  }
  return { numberOfReceitas: 0 };
}

export async function getAllInsumosFromReceita(
  idUser : number, 
  idReceita : number  
){
  try{
    const allInsumosFromReceita = await db
      .select({
        insumos : insumoTable,
        quantidade : insumosReceita.quantidade
      })
      .from(insumoTable)
      .innerJoin(
        insumosReceita,
        eq(insumoTable.id, insumosReceita.idInsumo)
      )
      .where(eq(insumosReceita.idReceita, idReceita ))
      .execute();
    return { allInsumosFromReceita };
  } catch (error) {
    console.error('Erro ao buscar insumos da receita:', error);
  }
  return { allInsumosFromReceita : [] };
}

export async function getReceitaById(id : number, idUser : number){
  try{
    const [receita] = await db
      .select()
      .from(receitaTable)
      .where(
        and(
          eq(receitaTable.idUser, idUser), 
          eq(receitaTable.id, id)
        ));
    return { receita };
  } catch (error) {
    console.error('Erro ao buscar insumos:', error);
  }
  return { receita : {} as receitaSelect };
}

export async function updateReceita(receita : receitaInsert, idUser : number){
  try{
    const [result]  = await db
      .update(receitaTable)
      .set(receita)
      .where(and(
        eq(receitaTable.id, receita.id ?? 1),
        eq(receitaTable.idUser, idUser)
      ))
      .returning({ id: receitaTable.id });
    return { id : result.id };
  } catch (error){
    console.error('Erro ao editar receita:', error);
  }
  return { id: 0 };
}

export async function excludeReceita(idReceita : number, idUser : number){
  try{
    const [result] = await db
      .delete(receitaTable)
      .where(and(
        eq(receitaTable.id, idReceita),
        eq(receitaTable.idUser, idUser)
      ))
      .returning({ id: receitaTable.id });
    return { id : result.id };
  } catch (error){
    console.error('Erro ao excluir receita:', error);
  }
  return { id: 0 };
}

export async function fazerReceita(idReceita : number, quantidadeReceita : number, idUser : number){
  try{
    // Conseguir os insumos daquela receita
    let {allInsumosFromReceita} = await getAllInsumosFromReceita(idUser, idReceita);
    let {receita} = await getReceitaById(idReceita, idUser);

    // Verificar se a quantidade que tem daquele insumo é suficiente
    allInsumosFromReceita.forEach(async insumoQuantReceita => {
      if(insumoQuantReceita.insumos.quantidadeEstoque < insumoQuantReceita.quantidade * quantidadeReceita){
        console.log(insumoQuantReceita.insumos.quantidadeEstoque, insumoQuantReceita.quantidade * quantidadeReceita);
        throw new Error('Quantidade insuficiente');
      }
    })

    // Incrementar um novo produto
    const addProduto = acrescentaProduto(
      receita.idProduto, 
      idUser, 
      receita.quantProdutoGera * quantidadeReceita
    );

    // Decrementar dos insumos
    allInsumosFromReceita.forEach(async insumoPrecisaReceita => {
      const decInsumo = await decrementaInsumo(
        insumoPrecisaReceita.insumos.id, 
        idUser, 
        insumoPrecisaReceita.quantidade * quantidadeReceita
      );
    });

  }
  catch (error){
    console.error('Erro ao fazer receita:', error);
  }
}

export async function acrescentaProduto(idProduto : number, idUser : number, quantidadeFezProduto : number){
  try{
    const [result] = await db
      .update(produtoTable)
      .set({
        quantidadeEstoque: sql`${produtoTable.quantidadeEstoque} + ${quantidadeFezProduto}`
      })
      .where(and(
        eq(produtoTable.id, idProduto),
        eq(produtoTable.idUser, idUser)
      ))
      .returning({ id: produtoTable.id });
    return { id : result.id };
  }
  catch (error){
    console.error('Erro ao acrescentar produto:', error);
  }
  return { id: 0 };
}

export async function decrementaInsumo(idInsumo : number, idUser : number, quantidadeDecrementa : number){
  try{
    const [result] = await db
      .update(insumoTable)
      .set({
        quantidadeEstoque: sql`${insumoTable.quantidadeEstoque} - ${quantidadeDecrementa}`
      })
      .where(and(
        eq(insumoTable.id, idInsumo),
        eq(insumoTable.idUser, idUser)
      ))
      .returning({ id: insumoTable.id });
    return { id : result.id };
  }
  catch (error){
    console.error('Erro ao decrementar insumo:', error);
  }
}