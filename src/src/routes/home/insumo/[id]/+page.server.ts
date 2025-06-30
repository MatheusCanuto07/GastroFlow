import { insumoQueries } from '$lib/server/controller/insumo';
import type { PageServerLoad } from './$types';

export const load = (async ({params}) => {
  let idUser = 1;
  let {insumo} = await insumoQueries.getInsumoById(parseInt(params.id), idUser);

  return {
    insumo
  };
}) satisfies PageServerLoad;