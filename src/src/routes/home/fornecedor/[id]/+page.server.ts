import type { PageServerLoad } from './$types';
import { fornecedorQueries } from '$lib/server/controller/fornecedor';
import { insumoQueries } from '$lib/server/controller/insumo';

export const load = (async ({params}) => {
  let idUser = 1;
  let getFornecedorById = await fornecedorQueries.getFornecedorById(parseInt(params.id), idUser);
  const insumos = await insumoQueries.getAllInsumoFromFornecedor(
    idUser, parseInt(params.id)
  );
  return {
    fornecedor : getFornecedorById.fornecedor,
    insumos : insumos.allInsumosFromFornecedor
  };
}) satisfies PageServerLoad;