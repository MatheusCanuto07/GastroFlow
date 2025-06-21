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
	novofornecedor: async ({ request }) => {
		const data = await request.formData();

		const name = data.get('nome')?.toString();
		const telefone = data.get('telefone')?.toString();
		const email = data.get('email')?.toString();
		const status = data.get('status')?.toString();
		const idUser = data.get('idUser')?.toString();

		const errors: any = {};

		if (!name) {
			errors.name = { invalid: true };
		}

		if (!telefone || telefone.length > 20) {
			errors.telefone = { invalid: true };
		}

		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email || !regex.test(email)) {
			errors.email = { invalid: true };
		}

		if (!status) {
			errors.status = { invalid: true };
		}

		if (!idUser) {
			errors.idUser = { invalid: true };
		}

		if (Object.keys(errors).length > 0) {
			return fail(400, { errors });
		}

		try {
			const newId = await fornecedorQueries.insertFornecedor({
        name: name ?? "",
        idUser: idUser ? parseInt(idUser) : 0,
        status: status ?? "",
        telefone: telefone ?? "",
        contato: telefone ?? "",
        email: email ?? ""
      });
			return { success: true, newId: newId };
		} catch (error) {
			return { success: false, message: 'Erro ao inserir fornecedor' };
		}
	},
	
	// apagarFornecedor: async ({ request }) => {
	// 	const data = await request.formData();

	// 	const idFornecedor = data.get('idFornecedor')?.toString();
	// 	if (!idFornecedor) {
	// 		throw new Error('Selecione um fornecedor válido.');
	// 	}

	// 	const idDeletedFornecedor = await fornecedorQueries.deleteFornecedor(parseInt(idFornecedor));
	// 	return idDeletedFornecedor.rows.length > 0
	// 		? { success: true, idDeletedFornecedor }
	// 		: { error: 'Nenhum fornecedor deletado' };
	// }
} satisfies Actions;
