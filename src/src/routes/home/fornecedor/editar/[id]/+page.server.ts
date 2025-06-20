import type { PageServerLoad } from './$types';
import { fornecedorQueries } from '$lib/server/controller/fornecedor';
import { insumoQueries } from '$lib/server/controller/insumo';
import type { fornecedorInsert } from '$lib/server/schema/fornecedor';

export const load = (async ({params}) => {
  let idUser = 1;
  let getFornecedorById = await fornecedorQueries.getFornecedorById(2, idUser);
  const insumos = await insumoQueries.getAllInsumoFromFornecedor(
    idUser, parseInt(params.id)
  );
  return {
    fornecedor : getFornecedorById.fornecedor,
    insumos : insumos.allInsumosFromFornecedor
  };
}) satisfies PageServerLoad;

export const actions = {
  editarfornecedor: async ({ request }) => {
      console.log("chegou aquiS")
      const data = await request.formData();
  
      const id = data.get('id')?.toString();
      const idUser = data.get('idUser')?.toString();
      const name = data.get('nome')?.toString();
      const telefone = data.get('telefone')?.toString();
      const email = data.get('email')?.toString();
      const status = data.get('status')?.toString();
  
      if (!name || !status || !email || !telefone || !id || !idUser) {
        throw new Error('Nome e status são obrigatórios');
      }
  
      const fornecedorUpdate: fornecedorInsert = {
        name,
        status,
        telefone,
        contato: telefone,
        email,
        idUser: parseInt(idUser),
        updatedAt: new Date().toISOString()
      };
  
      const idUpdatedUser = await fornecedorQueries.updateFornecedor(fornecedorUpdate, parseInt(id));
      return { success: true, idUpdatedUser };
  },
}