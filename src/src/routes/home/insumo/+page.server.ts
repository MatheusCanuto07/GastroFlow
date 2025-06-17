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
    const idUser = 1;
    const data = await request.formData();
    
    const name = data.get('nome')?.toString();
    const categoria = data.get('categoria')?.toString() || '';
    const dataValidade = data.get('dataValidade')?.toString() || '';
    const quantidadeEstoque = Number(data.get('quantidadeEstoque') || 0);
    const custo = Number(data.get('custo') || 0);

    if(!name){
      return fail(400, {name, invalid : true})
    }

    if(categoria){
      return fail(400, {categoria, invalid : true})
    }

    const dataValidadeDate = new Date(dataValidade);
    if(dataValidadeDate.toString() === 'Invalid Date'){
      return fail(400, {dataValidade, invalid : true})
    }

    if(quantidadeEstoque < 0){
      return fail(400, {quantidadeEstoque, invalid : true})
    }

    if(custo < 0){
      return fail(400, {custo, invalid : true})
    }  
    
    const newId = await insumoQueries.addInsumo({
      name,
      categoria,
      dataValidade: dataValidade,
      quantidadeEstoque,
      custo,
      createdAt: new Date().toISOString(),
      idUser,
      idFornecedor: 1
    })
    // return { success: true, newId : newId  };
    
  }
};
