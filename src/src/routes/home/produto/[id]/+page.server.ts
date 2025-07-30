import type { PageServerLoad } from './$types';
import { getProdutoById } from '$lib/server/DAO/produto';

export const load = (async ({params}) => {
  let idUser = 1;
  let {produto} = await getProdutoById(parseInt(params.id), idUser);
  return {
    produto,
  };
}) satisfies PageServerLoad;