import type { Actions, PageServerLoad } from './$types';
import {
	insumoTable,
	type InsumoInsert,
	fornecedorTable,
	type fornecedorInsert
} from '$lib/server/schema/fornecedor';
import { fornecedorQueries } from '$lib/server/controller/insumo';

export const load: PageServerLoad = async ({}) => {
	return {};
};

export const actions = {
	novoinsumo: async ({ request }) => {
    console.log("mandou");
    const data = await request.formData();

		const name = data.get('nome')?.toString();
		const telefone = data.get('telefone')?.toString();
		const email = data.get('email')?.toString();
    const status = data.get('status')?.toString();

		if (!name || !status || !email || !telefone) {
			throw new Error('Nome e status são obrigatórios');
		}

		const fornecedorInsert: fornecedorInsert = {
			name,
			status,
			telefone,
      contato: telefone,
			email,
			createdAt: new Date().toISOString()
		};
    console.log(fornecedorInsert);
    
		const newId = await fornecedorQueries.insertFornecedor(fornecedorInsert);
		return { success: true, newId : newId  };
	}
} satisfies Actions;
