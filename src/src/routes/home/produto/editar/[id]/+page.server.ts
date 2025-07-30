import type { PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { goto } from '$app/navigation';
import { getProdutoById, updateProduto } from '$lib/server/DAO/produto';

export const load = (async ({params}) => {
  let idUser = 1;
  let {produto} = await getProdutoById(parseInt(params.id), idUser);

  return {
    produto
  };
}) satisfies PageServerLoad;

export const actions = {
  editarProduto: async ({ request, url }) => 
    {
      const data = await request.formData();
  
      const id = data.get('id')?.toString();
      const idUser = data.get('idUser')?.toString();
      const name = data.get('nome')?.toString();
      const quantidadeEstoque = data.get('quantidadeEstoque')?.toString();
      const unidadeMedida = data.get('unidadeMedida')?.toString();
  
      const errors: any = {};

      if (!name) {
        errors.name = { invalid: true };
      }

      if (!status) {
        errors.status = { invalid: true };
      }
  
      if (!idUser) {
        errors.idUser = { invalid: true };
      }

      if (!id){
        errors.id = { invalid: true };
      }

      if (Object.keys(errors).length > 0) {
        return fail(400, { errors });
      }
      
      try {
      const newId = await updateProduto({
        nome: name ?? "",
        idUser: idUser ? parseInt(idUser) : 1,
        quantidadeEstoque : quantidadeEstoque ? parseInt(quantidadeEstoque) : 0,
        unidadeDeMedida : unidadeMedida ?? ""
      }, parseInt(idUser ?? "0"));
    } catch (error) {
      return { success: false, message: 'Erro ao inserir fornecedor' };
    }
    throw redirect(303, '/home/fornecedor');
  },
}