import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { insumoQueries } from '$lib/server/controller/insumo';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
  novoinsumo: async ({ request }) => {
    const idUser = 1;
    const data = await request.formData();

    const name = data.get('nome')?.toString();
    const categoria = data.get('categoria')?.toString() || '';
    const dataValidade = data.get('dataValidade')?.toString() || '';
    const quantidadeEstoque = Number(data.get('quantidadeEstoque') || 0);
    const custo = Number(data.get('custo') || 0);

    const errors: any = {};

    if (!name) {
      errors.name = { invalid: true };
    }

    if (!categoria) {
      errors.categoria = { invalid: true };
    }

    const dataValidadeDate = new Date(dataValidade);
    if (dataValidadeDate.toString() === 'Invalid Date') {
      errors.dataValidade = { invalid: true };
    }

    if (quantidadeEstoque < 0) {
      errors.quantidadeEstoque = { invalid: true };
    }

    if (custo < 0) {
      errors.custo = { invalid: true };
    }

    if (Object.keys(errors).length > 0) {
      return fail(400, { errors });
    }

    try {
      const newId = await insumoQueries.addInsumo({
        name : name ?? "",
        categoria,
        dataValidade,
        quantidadeEstoque,
        custo,
        idUser
      });
    } catch (error) {
      return { success: false, message: 'Erro ao inserir fornecedor' };
    }
    redirect(303, '/home/insumo');
  }
};