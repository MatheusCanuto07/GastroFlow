import { insumoQueries } from '$lib/server/controller/insumo';
import { fail } from 'assert';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({params}) => {
  let idUser = 1;
  let {insumo} = await insumoQueries.getInsumoById(parseInt(params.id), idUser);

  return {
    insumo : insumo
  };
}) satisfies PageServerLoad;

export const actions = {
  editarinsumo: async ({ request, url }) => 
    {
      const data = await request.formData();
  
      const id = data.get('id')?.toString();
      const idUser = data.get('idUser')?.toString();
      const name = data.get('nome')?.toString();
      const categoria = data.get('categoria')?.toString();
      const dataValidade = data.get('dataValidade')?.toString();
      const quantidade = data.get('quantidade')?.toString();
      const custo = data.get('custo')?.toString();
  
      const errors: any = {};

      if (!name) {
        errors.name = { invalid: true };
      }
  
      if (!idUser) {
        errors.idUser = { invalid: true };
      }

      if (!id){
        errors.id = { invalid: true };
      }

      if (!categoria) {
        errors.categoria = { invalid: true };
      }
  
      if (!dataValidade) {
        errors.dataValidade = { invalid: true };
      }
  
      if (!quantidade) {
        errors.quantidade = { invalid: true };
      }
  
      if (!custo) {
        errors.custo = { invalid: true };
      }

      if (Object.keys(errors).length > 0) {
        return fail(400, { errors });
      }
      
      try {
      const newId = await insumoQueries.updateInsumo(
        1,
        {
          name: name ?? "",
          dataValidade: dataValidade ?? "",
          quantidadeEstoque: parseInt(quantidade ?? "0"),
          custo: parseInt(custo ?? "0"),
          createdAt: Date.now().toString(),
          categoria: categoria ?? "",
          idUser : 1,
          id : parseInt(id ?? "0")
        })
    } catch (error) {
      return { success: false, message: 'Erro ao inserir fornecedor' };
    }
    throw redirect(303, '/home/insumo');
  },
}