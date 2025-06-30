import type { PageServerLoad, Actions } from './$types';
import * as receitaQueries from '$lib/server/controller/receita';
import { invalidateAll } from '$app/navigation';

export const load = (async ({params}) => {
  const idUser = 1;
  const {allInsumosFromReceita} = await receitaQueries.getAllInsumosFromReceita(idUser, parseInt(params.id)); 
  const {receita} = await receitaQueries.getReceitaById(parseInt(params.id), idUser);
  const custoTotal = allInsumosFromReceita.reduce((acumulado, insumo) => {
    return acumulado + (insumo.quantidade * (insumo.insumos.custo / 100));
  }, 0);
  if(allInsumosFromReceita){
    return {
      allInsumosFromReceita,
      receita,
      custoTotal
    }
  }
  return {
    allInsumosFromReceita : [],
    receita : null,
    custoTotal
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  fazerReceita : async ({request, url}) => {;
    const data = await request.formData();
    const idReceita = data.get('idReceita')?.toString();
		let multiplicador = data.get('multiplicador')?.toString();

    if(!multiplicador){
      multiplicador = '1';
    }

    try {
      const newReceita = await receitaQueries.fazerReceita(
        parseInt(idReceita ?? "1"),
        parseInt(multiplicador),
        1
      );
      invalidateAll();
      return { success: true, newId: newReceita };
    } catch (error) {
      return { success: false, message: 'Erro ao inserir fornecedor' };
    }
  }
}