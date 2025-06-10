import type { Actions, PageServerLoad } from './$types';
import {
	insumoTable,
	type InsumoSelect,
	type InsumoInsert,
	produtoTable,
	type ProdutoInsert
} from '$lib/server/schema/produto'; // ajuste caminho e nomes conforme seu schema
import { produtoQueries } from '$lib/server/controller/produto';

export const load: PageServerLoad = async ({}) => {
	return {};
};

export const actions: Actions = {
	novoproduto: async ({ request }) => {
		const data = await request.formData();

		const nome = data.get('nome')?.toString();
		const categoria = data.get('categoria')?.toString() || '';
		const quantidadeEstoque = Number(data.get('quantidadeEstoque') || 0);
		const precoCusto = Number(data.get('precoCusto') || 0);
		const precoVenda = Number(data.get('precoVenda') || 0);
		const descricao = data.get('descricao')?.toString() || '';

		if (!nome) {
			throw new Error('Nome é obrigatório');
		}

		// Capturar insumos e quantidades para cálculo futuro
		const insumosSelecionados: Array<{ id: number; quantidade: number }> = [];

		for (const [key, value] of data.entries()) {
			if (key.startsWith('quantidadeInsumo_')) {
				const idStr = key.replace('quantidadeInsumo_', '');
				const id = Number(idStr);
				const quantidade = Number(value);
				if (!isNaN(id) && !isNaN(quantidade)) {
					insumosSelecionados.push({ id, quantidade });
				}
			}
		}

		// Aqui poderia vir a lógica para calcular precoCusto com base nos insumos
		// Por enquanto, vamos salvar precoCusto 0

		const novoProduto: ProdutoInsert = {
			nome,
			categoria,
			quantidadeEstoque,
			precoCusto,
			precoVenda,
			descricao
		};

		try {
			const result = await produtoQueries.inserirProduto(novoProduto);

			// Inserir insumos vinculados ao produto na tabela de insumos do produto
			for (const insumo of insumosSelecionados) {
				await produtoQueries.vincularInsumoAoProduto(result.insertId, insumo.id, insumo.quantidade);
			}

			return { success: true, message: 'Produto cadastrado com sucesso!' };
		} catch (err) {
			return { success: false, message: 'Erro ao cadastrar produto.' };
		}
	}
};
