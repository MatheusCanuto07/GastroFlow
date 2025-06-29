<script lang="ts">
	import type { PageData } from './$types';
	import Modal from '$lib/components/Modal.svelte';
	import Breadcrump from '$lib/components/Breadcrump.svelte';
  import { filters } from '../params.svelte';

	let { data }: { data: PageData } = $props();
  let allProdutos = $derived(data.allProdutos);
  const idUser = data.idUser ?? 1;
  let nPages = data.nPages;

  let search = $state('');
	let searchStatus = $state('ativo');
  let page = $state(1);
	async function changeUrl() {
		filters.update({ search: search, status: searchStatus, page: page.toString() });
	}
</script>

{#snippet breadcrumpSnippet()}
  <li>
    <a href="/home/produto" class="hover:text-secondary-focus font-medium transition-colors">
      Produto
    </a>
  </li>
{/snippet}

<Breadcrump itensBreadcrumps={breadcrumpSnippet} />

<div class="border px-16 py-5">
	<div>
		<div class="flex w-full gap-3">
			<div class="w-8/12">
				<input type="text" placeholder="Pesquisar um produto" class="input input-bordered w-full" bind:value={search}
					oninput={changeUrl}/>
			</div>
			<div class="flex w-6/12 gap-3">
			</div>
		</div>
	</div>
</div>

<div class="mb-10 mt-3 h-[70vh] overflow-x-auto rounded-box border border-base bg-base-10">
	<table class="table h-auto pb-44" style="border: none !important;">
		<thead>
			<tr>
				<th></th>
				<th>Nome</th>
				<th>Quantidade em estoque</th>
				<th>Preço de venda</th>
				<th class="text-center">Ações</th>
			</tr>
		</thead>
		<tbody>
      {#each allProdutos ?? [] as pro, index}
				<tr class="cursor-pointer hover:bg-base-300">
					<th>{pro.id}</th>
					<td>{pro.nome}</td>
					<td>{pro.quantidadeEstoque}</td>
					<td>{pro.unidadeDeMedida}</td>
					<td class="text-center">
						<details class="dropdown dropdown-end dropdown-bottom">
							<summary class="btn m-1">...</summary>
							<ul class="menu dropdown-content z-50 w-52 rounded-box bg-base-100 p-2 shadow-sm">
								
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