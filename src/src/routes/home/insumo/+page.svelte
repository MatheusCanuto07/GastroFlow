<script lang="ts">
  import Modal from '$lib/components/Modal.svelte';

  
  import {enhance} from "$app/forms";
  import type {PageData, ActionData} from './$types';

	let {data, form}: {data : PageData; form: ActionData} = $props();
  let dataInsumos = data.insumos;
  console.log(dataInsumos);
</script>

{#snippet novoInsumo()}
    <div class="flex flex-wrap gap-4">
      <div class="w-6/12">
        <h1>Nome</h1>
        {#if form?.errors?.name}
          <p class="text-red-500 bg-red-100 border border-red-400 p-2 rounded mb-4">Digite um nome válido</p>
        {/if}
        <input
          name="nome"
          type="text"
          placeholder="Digite o nome do insumo"
          class="input input-bordered w-full"
          required
        />
      </div>

      <div class="w-6/12">
        <h1>Categoria</h1>
        {#if form?.errors.categoria}
          <p class="text-red-500 rounded mb-1">Digite uma categoria válida</p>
        {/if}
        <input
          name="categoria"
          placeholder="Categoria"
          type="text"
          class="input input-bordered w-full"
          required
        />
        </div>

      <div class="w-4/12">
        <h1>Data de Validade</h1>
        {#if form?.errors.dataValidade}
          <p class="text-red-500 rounded mb-1">Digite uma data válida</p>
        {/if}
        <input
          name="dataValidade"
          type="date"
          class="input input-bordered w-full"
          placeholder="Validade"
          required
        />
      </div>

      <div class="w-4/12">
        <h1>Quantidade</h1>
        {#if form?.errors.quantidadeEstoque}
          <p class="text-red-500 rounded mb-1">Digite uma quantidade válida</p>
        {/if}
        <input
          name="quantidadeEstoque"
          type="number"
          class="input input-bordered w-full"
          min="0"
          placeholder="Quantidade"
          required
        />
      </div>

      <div class="w-4/12">
        <h1>Custo (R$)</h1>
        {#if form?.errors.custo}
          <p class="text-red-500 rounded mb-1">Digite um custo válido</p>
        {/if}
        <input
          name="custo"
          type="number"
          class="input input-bordered w-full"
          min="0"
          step="0.01"
          placeholder="Custo"
          required
        />
      </div>
    </div>

    <div class="mt-6">
      <button type="submit" class="btn btn-primary w-full">
        Salvar Insumo
      </button>
    </div>
{/snippet}

<div class="border px-8 py-5 rounded">
  <div class="flex w-full gap-3 items-center">
    <input
      type="text"
      placeholder="Pesquisar um insumo"
      class="input input-bordered w-full"
    />
    <div class="w-4/12">
      <form action="?/novoinsumo" method="POST" use:enhance>
        <Modal
        modalContent={novoInsumo}
        textoBotao={"Novo Insumo"}
        classeBotao={'btn-success w-full'}
        title="Cadastrar Novo Insumo"
        />
      </form>
    </div>
  </div>    
</div>

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
      {#each dataInsumos?.allInsumo as insumo}
        <tr class="cursor-pointer hover:bg-base-300">
          <td class="font-semibold">{insumo.id}</td>
          <td>{insumo.name}</td>
          <td>{insumo.categoria}</td>
          <td>{insumo.quantidadeEstoque}</td>
          <td>R$ {insumo.custo}</td>
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