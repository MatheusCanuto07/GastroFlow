import type { Actions, PageServerLoad } from './$types';
import * as receitaQueries from '$lib/server/controller/receita';

export const load: PageServerLoad = async ({url}) => {
  const idUser: number = 1;
  const searchName = url.searchParams.get('search');
  const page = url.searchParams.get('page') ?? '1';
  const searchStatus = url.searchParams.get('status');

  const {allReceitas} = await receitaQueries.getAllReceitas(idUser, searchName || '', page);
  const {numberOfReceitas} = await receitaQueries.numberOfReceitas(idUser);
  const nPages = Math.floor(numberOfReceitas / 10) + (numberOfReceitas % 10 > 0 ? 1 : 0);
  // const custoReceita = await receitaQueries.
  if (allReceitas) {
    return {
      allReceitas: allReceitas, 
      idUser: idUser,
      nPages 
    };
  }

	return {
    allReceitas: [],
    idUser: idUser,
    nPages
  };
};

