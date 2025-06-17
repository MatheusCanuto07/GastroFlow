import type { Actions, PageServerLoad } from './$types';
import {
	insumoTable,
	type InsumoInsert,
	fornecedorTable,
	type fornecedorInsert
} from '$lib/server/schema/fornecedor';
import { fornecedorQueries } from '$lib/server/controller/fornecedor';

export const load: PageServerLoad = async ({depends, url}) => {
  const idUser : number = 1;
  const allfornecedores = await fornecedorQueries.getAllFornecedores(idUser);
  //Se algo relacionado a essa dependência mudar (como um dado associado a "todos"), a função load será reexecutada
  depends("pagination");
  const searchParams = url.searchParams;
  console.log(searchParams)
  
  const page = Number(searchParams.get('page') ?? '1')
  const pageSize = Number(searchParams.get('pageSize') ?? '5')
  //const todos = await todoQueries.obterTodoWithLimit(page,pageSize);
  //const allInsumosFromFornecedor = await fornecedorQueries.getAllInsumosFromFornecedor(id, idUser);
  if (allfornecedores) {
    return { allfornecedores: allfornecedores, idUser : idUser };
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
    
		const newId = await fornecedorQueries.insertFornecedor(fornecedorInsert);
		return { success: true, newId : newId  };
	},
  editarfornecedor: async ({request}) => {
    const data = await request.formData();

    const id = data.get('id')?.toString();
    const idUser = data.get('idUser')?.toString();
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
  apagarFornecedor: async ({request}) => {
    const data = await request.formData();

    const idFornecedor = data.get('idFornecedor')?.toString();
    console.log(idFornecedor);
    if (!idFornecedor){
      throw new Error('Selecione um fornecedor válido.');
    }

    const idDeletedFornecedor = await fornecedorQueries.deleteFornecedor(parseInt(idFornecedor));
    return idDeletedFornecedor.rows.length > 0 ? { success: true, idDeletedFornecedor } : { error: 'Nenhum fornecedor deletado'};
  },
} satisfies Actions;
