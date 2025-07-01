import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { insumoQueries } from '$lib/server/controller/insumo';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions = {
  novoproduto: async ({ request }) => {
    const data = await request.formData();

    const id = data.get('id')?.toString();
    const idUser = data.get('idUser')?.toString();
    const name = data.get('nome')?.toString();
    const unidadeMedida = data.get('unidadeMedida')?.toString();
    const quantidadeEstoque = data.get('quantidadeEstoque')?.toString();

    const errors: any = {};

    if (!name) {
      errors.name = { invalid: true };
    }

    if (!unidadeMedida) {
      errors.status = { invalid: true };
    }

    if (!idUser) {
      errors.idUser = { invalid: true };
    }

    if (!quantidadeEstoque) {
      errors.idUser = { invalid: true };
    }

    if (Object.keys(errors).length > 0) {
      return fail(400, { errors });
    }

    // try {
    //   const newId = await insumoQueries.insertInsumo({
    //     name: name ?? "",
    //     idUser: idUser ? parseInt(idUser) : 0,
    //     status: status ?? "",
    //     telefone: telefone ?? "",
    //     contato: telefone ?? "",
    //     email: email ?? ""
    //   });
    // } catch (error) {
    //   return { success: false, message: 'Erro ao inserir fornecedor' };
    // }
    redirect(303, '/home/produto');
  },
} satisfies Actions;