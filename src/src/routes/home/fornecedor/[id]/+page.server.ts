import type { PageServerLoad } from './$types';
import { fornecedorQueries } from '$lib/server/DAO/fornecedor';
import { insumoQueries } from '$lib/server/DAO/insumo';

export const load = (async ({params}) => {
  let idUser = 1;
  let getFornecedorById = await fornecedorQueries.getFornecedorById(parseInt(params.id), idUser);
  const insumos = await insumoQueries.getInsumosByFornecedorId(
    idUser, 
    parseInt(params.id)
  );
  return {
    fornecedor : getFornecedorById.fornecedor,
    insumos : insumos ?? []
  };
}) satisfies PageServerLoad;