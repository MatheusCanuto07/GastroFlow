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
	apagarinsumo: async ({ request }) => 
  {
    const data = await request.formData();

    const idInsumo = data.get('idInsumo')?.toString();

    if (!idInsumo) {
      throw new Error('Selecione um fornecedor válido.');
    }
    const idUser = 1;1
    console.log(idInsumo)
    const {id} = await insumoQueries.deleteInsumo(idUser, parseInt(idInsumo));
    return id > 0
      ? { success: true, id }
      : { error: 'Nenhum fornecedor deletado' };
  }
};
