import type { PageServerLoad, Actions } from './$types';
import * as receitaQueries from '$lib/server/controller/receita';

export const load = (async ({params}) => {
  const idUser = 1;
  const {allInsumosFromReceita} = await receitaQueries.getAllInsumosFromReceita(idUser, parseInt(params.id)); 
  const {receita} = await receitaQueries.getReceitaById(parseInt(params.id), idUser);
  if(allInsumosFromReceita){
    return {
      allInsumosFromReceita,
      receita
    }
  }
  return {
    allInsumosFromReceita : [],
    receita : null
  };
}) satisfies PageServerLoad;