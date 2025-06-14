// import type { Actions, PageServerLoad } from './$types';
// import {
//   insumoTable,
//   type InsumoInsert,
//   fornecedorTable,
//   type fornecedorInsert
// } from '$lib/server/schema/fornecedor';
// import { fornecedorQueries, insumoQueries } from '$lib/server/controller/insumo';

// export const load: PageServerLoad = async () => {
//   // Pega fornecedores para popular dropdown no front
//   const fornecedores = await fornecedorQueries.listAllFornecedores();

//   return {
//     fornecedores
//   };
// };

// export const actions: Actions = {
//   novoinsumo: async ({ request }) => {
//     const data = await request.formData();

//     const nome = data.get('nome')?.toString();
//     const categoria = data.get('categoria')?.toString();
//     const dataValidade = data.get('dataValidade')?.toString();
//     const quantidadeDisponivelStr = data.get('quantidadeDisponivel')?.toString();
//     const unidade = data.get('unidade')?.toString();
//     const idFornecedorStr = data.get('fornecedor')?.toString();

//     if (!nome || !categoria || !dataValidade || !quantidadeDisponivelStr || !unidade || !idFornecedorStr) {
//       throw new Error('Preencha todos os campos!');
//     }

//     const quantidadeDisponivel = Number(quantidadeDisponivelStr);
//     const idFornecedor = Number(idFornecedorStr);

//     if (isNaN(quantidadeDisponivel) || isNaN(idFornecedor)) {
//       throw new Error('Quantidade e fornecedor inválidos!');
//     }

//     const novoInsumo: InsumoInsert = {
//       nome,
//       categoria,
//       dataValidade,
//       quantidadeDisponivel,
//       unidade,
//       idFornecedor,
//       createdAt: new Date().toISOString()
//     };

//     const newId = await insumoQueries.insertInsumo(novoInsumo);

//     return { success: true, newId };
//   }
// };
