import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fornecedorQueries } from '$lib/server/controller/fornecedor';

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;

export const actions = {
  novofornecedor: async ({ request }) => {
    const data = await request.formData();

    const name = data.get('nome')?.toString();
    const telefone = data.get('telefone')?.toString();
    const email = data.get('email')?.toString();
    const status = data.get('status')?.toString();
    const idUser = data.get('idUser')?.toString();

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

    if (Object.keys(errors).length > 0) {
      return fail(400, { errors });
    }

    try {
      const newId = await fornecedorQueries.insertFornecedor({
        name: name ?? "",
        idUser: idUser ? parseInt(idUser) : 0,
        status: status ?? "",
        telefone: telefone ?? "",
        contato: telefone ?? "",
        email: email ?? ""
      });
    } catch (error) {
      return { success: false, message: 'Erro ao inserir fornecedor' };
    }
    redirect(303, '/home/fornecedor');
  },
} satisfies Actions;