import { eq, like, and, desc } from 'drizzle-orm';
import { db } from "../db";
import type {InferSelectModel }  from 'drizzle-orm';

// A tabela passada como parametro tem que ter esses campos
export async function getAllGeneric<TipoTabela>(
  table: any,
  idUser: number,
  searchName: string | null = null,
  pageNumber: string | null = null
): Promise<{ result: TipoTabela[] }> {
  try {
    const whereConditions = and(
      like(table.nome, `%${searchName ?? ''}%`),
      eq(table.idUser, idUser)
    );

    const result = await db
      .select()
      .from(table)
      .where(whereConditions)
      .orderBy(desc(table.id))
      .limit(searchName ? 100 : 10)
      .offset(
        searchName == null
          ? pageNumber == null || pageNumber === '1'
            ? 0
            : parseInt(pageNumber) * 5
          : 0
      );

    return { result: result as TipoTabela[] };
  } catch (error) {
    console.error('Erro ao buscar dados da tabela:', error);
    return { result: [] };
  }
}


export async function getByIdGeneric<T extends { id: number; idUser: number }>(
  table: any,
  id: number,
  idUser: number
) {
  try {
    const [record] = await db
      .select()
      .from(table)
      .where(and(
        eq(table.id, id),
        eq(table.idUser, idUser)
      ));

    return { record };
  } catch (error) {
    console.error('Erro ao buscar registro da tabela:', error);
    return { record: {} as T };
  }
}

export async function excludeGeneric<T extends { id: number; idUser: number }>(
  table: any,
  id: number,
  idUser: number
) {
  try {
    const [result] = await db
      .delete(table)
      .where(and(
        eq(table.id, id),
        eq(table.idUser, idUser)
      ))
      .returning({ id: table.id });

    return { id: result?.id ?? 0 };
  } catch (error) {
    console.error('Erro ao excluir registro da tabela:', error);
    return { id: 0 };
  }
}

