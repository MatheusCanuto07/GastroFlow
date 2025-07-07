import type { Actions, PageServerLoad } from './$types';
import * as receitaQueries from '$lib/server/DAO/receita';
import * as genericsDAO from '$lib/server/DAO/generics';
import { receitaTable } from "$lib/server/schema/receita";
import type { InferSelectModel } from 'drizzle-orm';

export const load: PageServerLoad = async ({url}) => {
  const idUser = 1;
  const searchName = url.searchParams.get('search');
  const page = url.searchParams.get('page') ?? '1';
  const searchStatus = url.searchParams.get('status');

  type Receita = InferSelectModel<typeof receitaTable>;
  const { result } = await genericsDAO.getAllGeneric<Receita>(receitaTable, idUser);

  const nPages = Math.floor(result.length / 10) + (result.length % 10 > 0 ? 1 : 0);

  console.log(result);
	return {
    allReceitas: result || [],
    idUser: idUser,
    nPages
  };
};

