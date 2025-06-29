<script lang="ts">
  import Modal from '$lib/components/Modal.svelte';
  import {enhance} from "$app/forms";
  import type {PageData, ActionData} from './$types';
  import { filters } from '../params.svelte';
	import Breadcrump from '$lib/components/Breadcrump.svelte';

  // Dados de quando a página carrega
	let {data, form}: {data : PageData; form: ActionData} = $props();
  let allInsumos = $derived(data.allInsumo);
  let nPages = data.nPages;
  
  // Lógica da pesquisa
	let search = $state('');
	let searchStatus = $state('ativo');
  let page = $state(1);
	async function changeUrl() {
		filters.update({ search: search, status: searchStatus, page: page.toString() });
	}
</script>

{#snippet breadcrumpSnippet()}
  <li>
    <a href="/home/insumo" class="hover:text-secondary-focus font-medium transition-colors">
      insumo
    </a>
  </li>
{/snippet}

<Breadcrump itensBreadcrumps={breadcrumpSnippet} />

<div class="border px-8 py-5 flex">
  <div class="flex w-8/12 gap-3 items-center">
    <input
      type="text"
      placeholder="Pesquisar um insumo"
      class="input input-bordered w-full"
      bind:value={search}
			oninput={changeUrl}
    />
  </div>
  <div class="w-4/12 pl-5">
    <a class="btn btn-success w-full" href="/home/insumo/novo">Novo</a>
  </div>    
</div>

<div class="mb-10 mt-3 h-[70vh] overflow-x-auto rounded-box border border-base bg-base-10">
	<table class="table h-auto pb-44" style="border: none !important;">
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
      {#each allInsumos as insumo}
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

<div class="w-full flex justify-center mb-5">
  <div class="join">
    {#each Array(nPages) ?? [1] as n, index}
      <button class="join-item btn {page === index + 1 ? 'btn-active' : ''}" onclick={() => {page = index + 1; changeUrl()}}>{index + 1}</button>
    {/each}
  </div>
</div>