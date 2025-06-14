import type { Actions, PageServerLoad } from './$types';
import {
	insumoTable,
	type InsumoInsert,
	fornecedorTable,
	type fornecedorInsert
} from '$lib/server/schema/fornecedor';
import { fornecedorQueries } from '$lib/server/controller/insumo';

export const load: PageServerLoad = async ({}) => {
  const idUser = 1;
  const allfornecedores = await fornecedorQueries.getAllFornecedores(idUser);
  if (allfornecedores) {
    console.log(allfornecedores);
    return { allfornecedores };
  }
};

export const actions = {
	novoinsumo: async ({ request }) => {
    const data = await request.formData();

		const name = data.get('nome')?.toString();
		const telefone = data.get('telefone')?.toString();
		const email = data.get('email')?.toString();
    const status = data.get('status')?.toString();
    const idUser = data.get('idUSer')?.toString();

		if (!name || !status || !email || !telefone || !idUser) {
			throw new Error('Nome e status são obrigatórios');
		}  

		const fornecedorInsert: fornecedorInsert = {
			name,
			status,
			telefone,
      contato: telefone,
			email,
      idUser : parseInt(idUser),
			createdAt: new Date().toISOString()
		};
    console.log(fornecedorInsert);
    
		const newId = await fornecedorQueries.insertFornecedor(fornecedorInsert);
		return { success: true, newId : newId  };
	},
  editarfornecedor: async ({request}) => {
    const data = await request.formData();

    const id = data.get('id')?.toString();
    const idUser = data.get('idUSer')?.toString();
		const name = data.get('nome')?.toString();
		const telefone = data.get('telefone')?.toString();
		const email = data.get('email')?.toString();
    const status = data.get('status')?.toString();

    if (!name || !status || !email || !telefone || !id || !idUser ) {
			throw new Error('Nome e status são obrigatórios');
		} 

    const fornecedorUpdate: fornecedorInsert = {
      name,
      status,
      telefone,
      contato: telefone,
      email,
      idUser : parseInt(idUser),
      updatedAt: new Date().toISOString()
    };

    const idUpdatedUser = await fornecedorQueries.updateFornecedor(fornecedorUpdate, parseInt(id));
    return { success: true, idUpdatedUser };
  },
} satisfies Actions;
