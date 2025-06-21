<script lang="ts">
  import Modal from '$lib/components/Modal.svelte';
  import {enhance} from "$app/forms";
  import type {PageData, ActionData} from './$types';

	let {data, form}: {data : PageData; form: ActionData} = $props();
  let dataInsumos = data.insumos;
</script>

<div class="border px-8 py-5">
  <div class="flex w-full gap-3 items-center">
    <input
      type="text"
      placeholder="Pesquisar um insumo"
      class="input input-bordered w-full"
    />
  </div>    
</div>

<div class="mb-10 mt-3 h-2/4 overflow-x-auto rounded-box border border-base-content/5 bg-base-10">
  <table class="table">
    <thead>
      <tr>
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