import type { PageServerLoad } from './$types';
import { fornecedorQueries } from '$lib/server/controller/fornecedor';
import { insumoQueries } from '$lib/server/controller/insumo';
import type { fornecedorInsert } from '$lib/server/schema/fornecedor';
import { fail, redirect } from '@sveltejs/kit';
import { goto } from '$app/navigation';

export const load = (async ({params}) => {
  let idUser = 1;
  let getFornecedorById = await fornecedorQueries.getFornecedorById(parseInt(params.id), idUser);
  const insumos = await insumoQueries.getInsumosByFornecedorId(
    idUser, parseInt(params.id)
  );

  return {
    fornecedor : getFornecedorById.fornecedor,
    insumos : insumos ?? []
  };
}) satisfies PageServerLoad;

export const actions = {
  editarfornecedor: async ({ request, url }) => 
    {
      const data = await request.formData();
  
      const id = data.get('id')?.toString();
      const idUser = data.get('idUser')?.toString();
      const name = data.get('nome')?.toString();
      const telefone = data.get('telefone')?.toString();
      const email = data.get('email')?.toString();
      const status = data.get('status')?.toString();
  
      const errors: any = {};

      if (!name) {
        errors.name = { invalid: true };
      }
  
      if (!telefone || telefone.length > 20) {
        errors.telefone = { invalid: true };
      }
  
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !regex.test(email)) {
        errors.email = { invalid: true };
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
      const newId = await fornecedorQueries.updateFornecedor({
        name: name ?? "",
        idUser: idUser ? parseInt(idUser) : 1,
        status: status ?? "",
        telefone: telefone ?? "",
        contato: telefone ?? "",
        email: email ?? ""
      }, id ?? "");
    } catch (error) {
      return { success: false, message: 'Erro ao inserir fornecedor' };
    }
    throw redirect(303, '/home/fornecedor');
  },
}