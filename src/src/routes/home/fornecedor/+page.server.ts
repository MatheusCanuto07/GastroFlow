import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { fornecedorQueries } from '$lib/server/controller/fornecedor';

export const load: PageServerLoad = async ({ depends, url }) => {
	const idUser: number = 1;
  const searchName = url.searchParams.get('search');
  const page = url.searchParams.get('page') ?? '1';
  const searchStatus = url.searchParams.get('status');
	const {allfornecedores} = await fornecedorQueries.getAllFornecedores(idUser, searchName || '', page, searchStatus);
  const {numberOfFornecedores} = await fornecedorQueries.numberOfFornecedores(idUser);
  const nPages = Math.floor(numberOfFornecedores / 10) + (numberOfFornecedores % 10 > 0 ? 1 : 0);
	if (allfornecedores) {
		return {
      allfornecedores: allfornecedores, 
      idUser: idUser,
      nPages 
    };
	}
  return {
    allfornecedores: [],
    idUser: idUser,
    nPages : {}
  }
};

export const actions = {
	apagarfornecedor: async ({ request }) => {
		const data = await request.formData();

		const idFornecedor = data.get('idFornecedor')?.toString();
    console.log(idFornecedor)
		if (!idFornecedor) {
			throw new Error('Selecione um fornecedor válido.');
		}
    const idUser = 1;
		const {id} = await fornecedorQueries.deleteFornecedor(parseInt(idFornecedor) ?? 0, idUser);
		return id > 0
			? { success: true, id }
			: { error: 'Nenhum fornecedor deletado' };
	}
} satisfies Actions;
