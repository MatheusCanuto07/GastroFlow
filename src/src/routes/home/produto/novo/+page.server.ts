import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { insertProduto } from '$lib/server/DAO/produto';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions = {
  novoproduto: async ({ request }) => {
    const data = await request.formData();

    const id = data.get('id')?.toString();
    const idUser = data.get('idUser')?.toString();
    const nome = data.get('nome')?.toString();
    const unidadeDeMedida = data.get('unidadeMedida')?.toString();
    const quantidadeEstoque = parseInt(data.get('quantidadeEstoque')?.toString() || '0');

    const errors: any = {};

    if (!nome) {
      errors.name = { invalid: true };
    }

    if (!unidadeDeMedida) {
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

    try {
      const newId = await insertProduto({
        idUser: idUser ? parseInt(idUser) : 0,
        nome : nome ?? "",
        unidadeDeMedida : unidadeDeMedida ?? "",
        quantidadeEstoque : quantidadeEstoque,
      });
    } catch (error) {
      return { success: false, message: 'Erro ao inserir fornecedor' };
    }
    redirect(303, '/home/produto');
  },
} satisfies Actions;