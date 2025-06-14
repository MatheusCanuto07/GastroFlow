<script lang="ts">
  import type { PageData } from './$types';
  import Modal from '$lib/components/Modal.svelte';

  let { data }: { data: PageData } = $props();

  import type { FornecedorSelect } from '$lib/server/schema/fornecedor';

  // Lista simulada de fornecedores para seleção (pode vir do load)
  let listaFornecedores: Array<FornecedorSelect> = [
    { id: 1, nome: 'Fornecedor A' },
    { id: 2, nome: 'Fornecedor B' }
  ];

  // Estado dos insumos cadastrados (simulação)
  let listaInsumos: Array<{
    id: number;
    nome: string;
    categoria: string;
    dataValidade: string;
    quantidadeDisponivel: number;
    unidade: string;
    fornecedorNome: string;
  }> = [];

  // Para seleção no formulário
  let fornecedorSelecionadoId: number | string = 'Selecione';

  function sendNewForm() {
    event?.preventDefault();
    // Aqui você pode implementar o envio para o backend via fetch ou form POST
    // Por enquanto só console.log para exemplificar

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const nome = formData.get('nome')?.toString() ?? '';
    const categoria = formData.get('categoria')?.toString() ?? '';
    const dataValidade = formData.get('dataValidade')?.toString() ?? '';
    const quantidadeDisponivel = Number(formData.get('quantidadeDisponivel'));
    const unidade = formData.get('unidade')?.toString() ?? '';
    const idFornecedor = Number(formData.get('fornecedor'));

    if (!nome || !categoria || !dataValidade || !quantidadeDisponivel || !unidade || idFornecedor === 0) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    console.log({
      nome,
      categoria,
      dataValidade,
      quantidadeDisponivel,
      unidade,
      idFornecedor
    });

    // Limpar form (exemplo)
    form.reset();
    fornecedorSelecionadoId = 'Selecione';
  }
</script>

{#snippet novoInsumo()}
  <form on:submit={sendNewForm} class="flex flex-wrap gap-4">
    <div class="w-6/12">
      <h1>Nome</h1>
      <input name="nome" type="text" placeholder="Nome do insumo" class="input input-bordered w-full" />
    </div>
    <div class="w-6/12">
      <h1>Categoria</h1>
      <input name="categoria" type="text" placeholder="Categoria" class="input input-bordered w-full" />
    </div>
    <div class="w-4/12">
      <h1>Data de Validade</h1>
      <input name="dataValidade" type="date" class="input input-bordered w-full" />
    </div>
    <div class="w-4/12">
      <h1>Quantidade Disponível</h1>
      <input
        name="quantidadeDisponivel"
        type="number"
        min="0"
        step="0.01"
        placeholder="Quantidade"
        class="input input-bordered w-full"
      />
    </div>
    <div class="w-4/12">
      <h1>Unidade</h1>
      <input name="unidade" type="text" placeholder="Ex: kg, g, ml, un" class="input input-bordered w-full" />
    </div>
    <div class="w-full">
      <h1>Fornecedor</h1>
      <select name="fornecedor" bind:value={fornecedorSelecionadoId} class="select select-bordered w-full">
        <option value="0" selected>Selecione</option>
        {#each listaFornecedores as f}
          <option value={f.id}>{f.nome}</option>
        {/each}
      </select>
    </div>

    <div class="w-full mt-3">
      <button type="submit" class="btn btn-success w-full">Cadastrar Insumo</button>
    </div>
  </form>
{/snippet}

{#snippet visualizarInsumos()}
  <div class="overflow-x-auto mt-5">
    <table class="table w-full">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Categoria</th>
          <th>Validade</th>
          <th>Qtd Disponível</th>
          <th>Unidade</th>
          <th>Fornecedor</th>
        </tr>
      </thead>
      <tbody>
        {#each listaInsumos as i}
          <tr>
            <td>{i.id}</td>
            <td>{i.nome}</td>
            <td>{i.categoria}</td>
            <td>{i.dataValidade}</td>
            <td>{i.quantidadeDisponivel}</td>
            <td>{i.unidade}</td>
            <td>{i.fornecedorNome}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/snippet}
