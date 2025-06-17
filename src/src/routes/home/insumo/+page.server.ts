import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import {
  insumoTable,
  type InsumoInsert,
} from '$lib/server/schema/fornecedor';
import { insumoQueries } from '$lib/server/controller/insumo';

export const load: PageServerLoad = async () => {
  const idUser = 1;
  const insumos = await insumoQueries.getAllInsumo(idUser);

  return {
    insumos
  };
};

export const actions: Actions = {
  novoinsumo: async ({ request }) => {
    const data = await request.formData();
    
    const name = data.get('nome')?.toString();
    const categoria = data.get('categoria')?.toString() || '';
    const dataValidade = data.get('dataValidade')?.toString() || '';
    const quantidadeEstoque = Number(data.get('quantidadeEstoque') || 0);
    const custo = Number(data.get('custo') || 0);

    if(!name){
      return fail(400, {name, missing : true})
    }

    if (!name || !categoria || !dataValidade || !quantidadeEstoque || !custo) {
      throw new Error('Nome e status são obrigatórios');
    }  

    // const fornecedorInsert: InsumoInsert = {
    //   name,
    //   status,
    //   telefone,
    //   contato: telefone,
    //   email,
    //   idUser : parseInt(idUser),
    //   createdAt: new Date().toISOString()
    // };
    
    // const newId = await fornecedorQueries.insertFornecedor(fornecedorInsert);
    // return { success: true, newId : newId  };

    
  }
};
