// import type { Actions, PageServerLoad } from './$types';
// import {
// 	insumoTable,
// 	type InsumoSelect,
// 	receitaTable,
// 	type ReceitaInsert
// } from '$lib/server/schema/fornecedor'; // ajuste seu import

// import { receitaQueries, insumoQueries } from '$lib/server/controller/insumo'; // ajuste seu import

// export const load: PageServerLoad = async () => {
// 	return {};
// };

// export const actions: Actions = {
// 	novareceita: async ({ request }) => {
// 		const data = await request.formData();

// 		const nome = data.get('nome')?.toString();
// 		const descricao = data.get('descricao')?.toString() ?? '';
// 		const quantidadeBaseStr = data.get('quantidadeBase')?.toString();
// 		const unidadeBase = data.get('unidadeBase')?.toString();
// 		const insumosRaw = data.get('insumos')?.toString();

// 		if (!nome || !quantidadeBaseStr || !unidadeBase || !insumosRaw) {
// 			throw new Error('Campos obrigatórios ausentes');
// 		}

// 		const quantidadeBase = parseFloat(quantidadeBaseStr);
// 		if (isNaN(quantidadeBase) || quantidadeBase <= 0) {
// 			throw new Error('Quantidade base inválida');
// 		}

// 		let insumos;
// 		try {
// 			insumos = JSON.parse(insumosRaw);
// 		} catch {
// 			throw new Error('Insumos inválidos');
// 		}

// 		// Busca os insumos para pegar os custos unitários do banco
// 		// Aqui você poderia já calcular o custo total baseado no banco
// 		let custoTotal = 0;

// 		for (const i of insumos) {
// 			// i = {id, quantidade}
// 			const insumoBanco = await insumoQueries.getById(i.id);
// 			if (!insumoBanco) throw new Error(`Insumo não encontrado: ${i.id}`);
// 			custoTotal += insumoBanco.custoUnitario * i.quantidade;
// 		}

// 		// Insere a receita no banco (ajuste conforme seu ORM ou query builder)
// 		const receitaNova: ReceitaInsert = {
// 			nome,
// 			descricao,
// 			quantidadeBase,
// 			unidadeBase,
// 			custoTotal,
// 			insumos // salve a lista ou faça associação em outra tabela
// 		};

// 		await receitaQueries.insert(receitaNova);

// 		return { success: true, message: 'Receita cadastrada com sucesso!' };
// 	}
// };
