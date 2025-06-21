import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
// import { insumoTable, type InsumoInsert } from '$lib/server/schema/insumo';
import { insumoQueries } from '$lib/server/controller/insumo';

export const load: PageServerLoad = async ({url}) => {
	const idUser = 1;
  const searchName = url.searchParams.get('search');
  const page = url.searchParams.get('page') ?? '1';
  const searchStatus = url.searchParams.get('status');
	const {allInsumo} = await insumoQueries.getAllInsumo(idUser, searchName || '', page);
  const {numberOfInsumos} = await insumoQueries.numberOfInsumos(idUser);
  const nPages = Math.floor(numberOfInsumos / 10) + (numberOfInsumos % 10 > 0 ? 1 : 0);
  if(allInsumo){
    return{
      allInsumo,
      nPages
    }
  }
	return {
		allInsumo : [],
    nPages : 0
	};
};

export const actions: Actions = {
	novoinsumo: async ({ request }) => {
		const idUser = 1;
		const data = await request.formData();

		const name = data.get('nome')?.toString();
		const categoria = data.get('categoria')?.toString() || '';
		const dataValidade = data.get('dataValidade')?.toString() || '';
		const quantidadeEstoque = Number(data.get('quantidadeEstoque') || 0);
		const custo = Number(data.get('custo') || 0);

		const errors: any = {};

		if (!name) {
			errors.name = { invalid: true };
		}

		if (!categoria) {
			errors.categoria = { invalid: true };
		}

		const dataValidadeDate = new Date(dataValidade);
		if (dataValidadeDate.toString() === 'Invalid Date') {
			errors.dataValidade = { invalid: true };
		}

		if (quantidadeEstoque < 0) {
			errors.quantidadeEstoque = { invalid: true };
		}

		if (custo < 0) {
			errors.custo = { invalid: true };
		}

		if (Object.keys(errors).length > 0) {
			return fail(400, { errors });
		}

		try {
			const newId = await insumoQueries.addInsumo({
				name : name ?? "",
				categoria,
				dataValidade,
				quantidadeEstoque,
				custo,
				idUser
			});
			return { success: true, newId: newId };
		} catch (error) {
			return { success: false, message: 'Erro ao inserir fornecedor' };
		}
	}
};
