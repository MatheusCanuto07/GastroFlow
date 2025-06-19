// import type { Actions, PageServerLoad } from './$types';
// import {
// 	insumoTable,
// 	type InsumoSelect,
// 	type InsumoInsert,
// 	produtoTable,
// 	type ProdutoInsert
// } from '$lib/server/schema/produto'; // ajuste caminho e nomes conforme seu schema
// import { produtoQueries } from '$lib/server/controller/produto';

// export const load: PageServerLoad = async ({}) => {
// 	return {};
// };

// export const actions: Actions = {
// 	novoproduto: async ({ request }) => {
// 		const data = await request.formData();

// 		const nome = data.get('nome')?.toString();
// 		const categoria = data.get('categoria')?.toString() || '';
// 		const quantidadeEstoque = Number(data.get('quantidadeEstoque') || 0);
// 		const precoCustoForm = Number(data.get('precoCusto') || 0);
// 		const descricao = data.get('descricao')?.toString() || '';

// 		if (!nome) {
// 			throw new Error('Nome é obrigatório');
// 		}

// 		// Capturar insumos e quantidades para cálculo futuro (exemplo, não usado ainda)
// 		const insumosSelecionados: Array<{ id: number; quantidade: number }> = [];

// 		for (const [key, value] of data.entries()) {
// 			if (key.startsWith('quantidadeInsumo_')) {
// 				const idStr = key.replace('quantidadeInsumo_', '');
// 				const id = Number(idStr);
// 				const quantidade = Number(value);
// 				if (!isNaN(id) && !isNaN(quantidade)) {
// 					insumosSelecionados.push({ id, quantidade });
// 				}
// 			}
// 		}

// 		// Cálculo do preço de venda: preço de custo + 30% de lucro
// 		const precoCusto = precoCustoForm; // Aqui depois você pode calcular baseado em insumos
// 		const precoVenda = Number((precoCusto * 1.3).toFixed(2));

// 		const novoProduto: ProdutoInsert = {
// 			nome,
// 			categoria,
// 			quantidadeEstoque,
// 			precoCusto,
// 			precoVenda,
// 			descricao
// 		};

// 		try {
// 			const result = await produtoQueries.inserirProduto(novoProduto);

// 			// Vincular insumos ao produto, se houver
// 			for (const insumo of insumosSelecionados) {
// 				await produtoQueries.vincularInsumoAoProduto(result.insertId, insumo.id, insumo.quantidade);
// 			}

// 			return { success: true, message: 'Produto cadastrado com sucesso!' };
// 		} catch (err) {
// 			return { success: false, message: 'Erro ao cadastrar produto.' };
// 		}
// 	}
// };


import type { Actions, PageServerLoad } from './$types';
import { produtos, insumos, criarProduto } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		produtos,
		insumos
	};
};

export const actions: Actions = {
	criarProduto: async ({ request }) => {
		const data = await request.formData();

		const nome = data.get('nome')?.toString() ?? '';
		const categoria = data.get('categoria')?.toString() ?? '';
		const quantidadeEstoque = Number(data.get('quantidadeEstoque') ?? 0);
		const margemLucro = Number(data.get('margemLucro') ?? 0);
		const precoCusto = Number(data.get('precoCusto') ?? 0);
		const precoVenda = Number(data.get('precoVenda') ?? 0);
		const descricao = data.get('descricao')?.toString() ?? '';

		// Processa insumos
		const insumosDoProduto = insumos
			.map((insumo) => {
				const quantidade = Number(data.get(`quantidadeInsumo_${insumo.id}`));
				if (quantidade > 0) {
					return { idInsumo: insumo.id, quantidade };
				}
				return null;
			})
			.filter((i) => i !== null) as { idInsumo: number; quantidade: number }[];

		criarProduto({
			nome,
			categoria,
			quantidadeEstoque,
			precoCusto,
			precoVenda,
			descricao,
			insumos: insumosDoProduto
		});

		// Após salvar, recarrega a página
		throw redirect(303, '/home/produto');
	},

	registrarProducao: async ({ request }) => {
		const data = await request.formData();

		const idProduto = Number(data.get('produto'));
		const multiplicador = Number(data.get('multiplicador') ?? 1);

		const produto = produtos.find((p) => p.id === idProduto);
		if (!produto) {
			return { error: 'Produto não encontrado' };
		}

		// Atualiza estoque (exemplo simples)
		produto.quantidadeEstoque += multiplicador;

		throw redirect(303, '/home/produto');
	}
};

