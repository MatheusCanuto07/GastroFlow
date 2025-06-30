import type { Actions, PageServerLoad } from './$types';
import * as receitaQueries from '$lib/server/controller/receita';

export const load = (async () => {
  
  return {};
}) satisfies PageServerLoad;


export const actions: Actions = {
	novareceita: async ({ request }) => {
		const data = await request.formData();

		const nome = data.get('nome')?.toString();
		const descricao = data.get('descricao')?.toString() ?? '';
		const quantidadeBaseStr = data.get('quantidadeBase')?.toString();
		const unidadeBase = data.get('unidadeBase')?.toString();
		const insumosRaw = data.get('insumos')?.toString();

		if (!nome || !quantidadeBaseStr || !unidadeBase || !insumosRaw) {
			throw new Error('Campos obrigatórios ausentes');
		}	

		return { success: true, message: 'Receita cadastrada com sucesso!' };
	}
};