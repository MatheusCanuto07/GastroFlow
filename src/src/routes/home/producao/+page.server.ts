// src/routes/producao/+page.server.ts
import type { Actions, PageServerLoad } from './$types';
import { receitaQueries, insumoQueries, produtoQueries, estoqueQueries } from '$lib/server/controller/producao';

export const load: PageServerLoad = async () => {
  // Carrega receitas com seus insumos para o front
  const receitas = await receitaQueries.listAllReceitasWithInsumos();

  return {
    receitas
  };
};

export const actions: Actions = {
  produzir: async ({ request }) => {
    const data = await request.formData();

    const receitaIdStr = data.get('receitaId')?.toString();
    const quantidadeStr = data.get('quantidade')?.toString();

    if (!receitaIdStr || !quantidadeStr) {
      return { success: false, error: 'Informe receita e quantidade' };
    }

    const receitaId = Number(receitaIdStr);
    const quantidade = Number(quantidadeStr);

    if (isNaN(receitaId) || isNaN(quantidade) || quantidade <= 0) {
      return { success: false, error: 'Valores inválidos' };
    }

    // Buscar receita e insumos
    const receita = await receitaQueries.getReceitaWithInsumos(receitaId);
    if (!receita) {
      return { success: false, error: 'Receita não encontrada' };
    }

    // Verifica estoque de cada insumo para a quantidade desejada
    for (const insumo of receita.insumos) {
      const insumoEstoque = await insumoQueries.getInsumoById(insumo.insumoId);
      if (!insumoEstoque) {
        return { success: false, error: `Insumo ${insumo.nome} não encontrado no estoque` };
      }
      const required = insumo.quantidade * quantidade;
      if (insumoEstoque.quantidadeDisponivel < required) {
        return { success: false, error: `Estoque insuficiente do insumo ${insumo.nome}. Necessário ${required}, disponível ${insumoEstoque.quantidadeDisponivel}` };
      }
    }

    // Calcular custo total da produção (somando custo dos insumos * quantidade)
    let custoTotal = 0;
    for (const insumo of receita.insumos) {
      const insumoEstoque = await insumoQueries.getInsumoById(insumo.insumoId);
      custoTotal += insumoEstoque.precoCusto * insumo.quantidade * quantidade;
    }

    // Calcular preço de venda com 30% de lucro sobre o custo total
    const precoVenda = custoTotal * 1.3;

    // Atualizar estoque dos insumos (subtrair)
    for (const insumo of receita.insumos) {
      const quantidadeASubtrair = insumo.quantidade * quantidade;
      await insumoQueries.decreaseInsumoQuantidade(insumo.insumoId, quantidadeASubtrair);
    }

    // Atualizar estoque do produto final (produto gerado pela receita)
    // Verifica se produto existe no estoque, senão cria
    const produtoEstoque = await produtoQueries.getProdutoByReceitaId(receitaId);
    if (produtoEstoque) {
      // Atualiza quantidade no estoque
      await estoqueQueries.increaseProdutoQuantidade(produtoEstoque.id, quantidade);
      // Atualiza preço custo e preço venda do produto
      await produtoQueries.updateProdutoPreco(produtoEstoque.id, custoTotal / quantidade, precoVenda / quantidade);
    } else {
      // Insere novo produto com preço custo e preço venda
      await produtoQueries.insertProduto({
        nome: receita.nomeProduto,
        precoCusto: custoTotal / quantidade,
        precoVenda: precoVenda / quantidade,
        estoque: quantidade,
        receitaId: receita.id
      });
    }

    return { success: true, message: `Produzidos ${quantidade} ${receita.nomeProduto}(s) com custo total de R$${custoTotal.toFixed(2)} e preço de venda unitário de R$${(precoVenda / quantidade).toFixed(2)}` };
  }
};
