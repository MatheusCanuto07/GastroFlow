<script lang="ts">
  import Modal from '$lib/components/Modal.svelte';

  let termoBusca = '';
  let insumos = [
    { id: 1, nome: 'Páprica picante', categoria: 'Especiaria', validade: '10/10/2025', quantidade: 2, custo: 45.0 },
    { id: 2, nome: 'Sal', categoria: 'Tempero', validade: '10/01/2026', quantidade: 10, custo: 20.0 },
    { id: 3, nome: 'Pimenta', categoria: 'Pimentas', validade: '25/09/2025', quantidade: 5, custo: 30.0 },
    { id: 4, nome: 'Fumaça líquida', categoria: 'Especiais', validade: '25/12/2025', quantidade: 5, custo: 30.0 }
  ];

  let insumosFiltrados = insumos;

  // Modal
  let showModal = false;

  function abrirModalNovoInsumo() {
    showModal = true;
  }

  function fecharModal() {
    showModal = false;
  }

  // Filtro
  // $: insumosFiltrados = insumos.filter(insumo =>
  //   insumo.nome.toLowerCase().includes(termoBusca.toLowerCase())
  // );

  // Formulário novo insumo (mock)
  let nome = '';
  let categoria = '';
  let validade = '';
  let quantidade = '';
  let custo = '';

  function salvarInsumo() {
    const novo = {
      id: Date.now(),
      nome,
      categoria,
      validade,
      quantidade: Number(quantidade),
      custo: parseFloat(custo)
    };
    insumos = [...insumos, novo];
    fecharModal();
    resetForm();
  }

  function resetForm() {
    nome = '';
    categoria = '';
    validade = '';
    quantidade = '';
    custo = '';
  }

  function excluirInsumo(id: number) {
    if (confirm('Deseja realmente excluir?')) {
      insumos = insumos.filter(i => i.id !== id);
    }
  }
  import {enhance} from "$app/forms";
  import type {PageData, ActionData} from './$types';

	let {data, form}: {data : PageData; form: ActionData} = $props();
</script>

<!-- Novo Insumo (conteúdo do modal) -->
{#snippet novoInsumo()}
  <form id="formInsumo">
    <div class="flex flex-wrap gap-4">
      <div class="w-6/12">
        <h1>Nome</h1>
        {#if form?.missing}<p class="error">The email field is required</p>{/if}
        <input
          name="nome"
          type="text"
          placeholder="Digite o nome do insumo"
          class="input input-bordered w-full"
          bind:value={nome}
          required
        />
      </div>

      <div class="w-6/12">
        <h1>Categoria</h1>
        <input
          name="categoria"
          placeholder="Categoria"
          type="text"
          class="input input-bordered w-full"
          bind:value={categoria}
          required
        />
        </div>

      <div class="w-4/12">
        <h1>Data de Validade</h1>
        <input
          name="dataValidade"
          type="date"
          class="input input-bordered w-full"
          placeholder="Validade"
          bind:value={validade}
          required
        />
      </div>

      <div class="w-4/12">
        <h1>Quantidade</h1>
        <input
          name="quantidadeEstoque"
          type="number"
          class="input input-bordered w-full"
          min="0"
          placeholder="Quantidade"
          bind:value={quantidade}
          required
        />
      </div>

      <div class="w-4/12">
        <h1>Custo (R$)</h1>
        <input
          name="custo"
          type="number"
          class="input input-bordered w-full"
          min="0"
          step="0.01"
          placeholder="Custo"
          bind:value={custo}
          required
        />
      </div>
    </div>

    

    <div class="mt-6">
      <button type="submit" class="btn btn-primary w-full">
        Salvar Insumo
      </button>
    </div>
  </form>
{/snippet}


<!--Barra de Pesquisa e Botão. TÁ CERTO -->
<div class="border px-8 py-5 rounded">
  <div class="flex w-full gap-3 items-center">
    <input
      type="text"
      placeholder="Pesquisar um insumo"
      class="input input-bordered w-full"
    />
    <div class="w-4/12">
      <Modal
      modalContent={novoInsumo}
      textoBotao={"Novo Insumo"}
      classeBotao={'btn-success w-full'}
      title="Cadastrar Novo Insumo"
      />
    </div>    
  </div>
</div>


<!--Tabela de Insumos: é a que tá aparecendo. TÁ CERTA-->
<div class="mt-6 overflow-x-auto">
  <table class="table w-full border rounded">
    <thead>
      <tr class="bg-base-200 text-base font-bold">
        <th></th>
        <th>Nome</th>
        <th>Categoria</th>
        <th>Estoque</th>
        <th>Preço</th>
        <th class="text-center">Ações</th>          
      </tr>
    </thead>
    <tbody>
      {#each insumosFiltrados as insumo}
        <tr class="cursor-pointer hover:bg-base-300">
          <td class="font-semibold">{insumo.id}</td>
          <td>{insumo.nome}</td>
          <td>{insumo.categoria}</td>
          <td>{insumo.quantidade}</td>
          <td>R$ {insumo.custo.toFixed(2).replace('.', ',')}</td>
            <td class="text-center">
              <details class="dropdown dropdown-end dropdown-bottom">
                <summary class="btn m-1">...</summary>
                <ul class="menu dropdown-content z-50 w-52 rounded-box bg-base-100 p-2 shadow-sm">
                  <li><button class="btn btn-info mt-2">Visualizar</button></li>
                  <li><button class="btn btn-secondary mt-2">Editar</button></li>
                  <li><button class="btn btn-warning mt-2">Remover</button></li>
                </ul>
              </details>
					</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>







