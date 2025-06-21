import type { PageServerLoad, Actions } from './$types';
import * as receitaQueries from '$lib/server/controller/receita';

export const load = (async ({params}) => {
  const idUser = 1;
  const {allInsumosFromReceita} = await receitaQueries.getAllInsumosFromReceita(idUser, parseInt(params.id)); 
  if(allInsumosFromReceita){
    return {
      allInsumosFromReceita
    }
  }
  return {
    allInsumosFromReceita : []
  };
}) satisfies PageServerLoad;