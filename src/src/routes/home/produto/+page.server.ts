import type { Actions, PageServerLoad } from './$types';
import * as produtosQueries from '$lib/server/DAO/produto'; // ajuste caminho e nomes conforme seu schema

export const load: PageServerLoad = async ({url}) => {
  const idUser: number = 1;
  const searchName = url.searchParams.get('search');
  const page = url.searchParams.get('page') ?? '1';

  const {allProdutos} = await produtosQueries.getAllProdutos(idUser, searchName || '', page);
  const {numberOfProdutos} = await produtosQueries.numberOfProdutos(idUser);
  const nPages = Math.floor(numberOfProdutos / 10) + (numberOfProdutos % 10 > 0 ? 1 : 0);
  if (allProdutos) {
    return {
      allProdutos: allProdutos, 
      idUser: idUser,
      nPages 
    };
  }
	return {};
};
