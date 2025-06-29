<script lang="ts">
	import Breadcrump from './../../../lib/components/Breadcrump.svelte';
	import type { PageData, ActionData } from './$types';
	import { filters } from '../params.svelte';
	let { data, form }: { data: PageData; form: ActionData } = $props();

	// Dados de quando a página carrega
	let allFornecedores = $derived(data.allfornecedores);
	const idUser = data ?? 1;
  let nPages = data.nPages;

	// Lógica da pesquisa
	let search = $state('');
	let searchStatus = $state('ativo');
  let page = $state(1);
	async function changeUrl() {
		filters.update({ search: search, status: searchStatus, page: page.toString() });
	}

	// Lógica de envio dos formulários
	let modalLoading: HTMLDialogElement | undefined = $state();
</script>

{#snippet apagarFornecedor()}
	<div class="flex flex-wrap">
		<!-- <h1 class="text-2xl font-bold text-gray-900">Tem certeza que deseja apagar esse fornecedor?</h1> -->
		<p class="text-md font-semibold">ESSA AÇÃO É IRREVERSÍVEL!</p>
	</div>
{/snippet}

{#snippet breadcrumpSnippet()}
  <li>
    <a href="/home/fornecedor" class="hover:text-secondary-focus font-medium transition-colors">
      Fornecedor
    </a>
  </li>
{/snippet}

<Breadcrump itensBreadcrumps={breadcrumpSnippet} />
<div class="border px-10 pb-5 pt-5">
	<div>
		<div class="flex w-full gap-3">
			<div class="w-8/12">
				<input
					type="text"
					placeholder="Pesquisar um fornecedor"
					class="input input-bordered w-full"
					bind:value={search}
					oninput={changeUrl}
				/>
			</div>
			<div class="w-2/12">
				<select
					class="select select-bordered w-full"
					bind:value={searchStatus}
					onchange={changeUrl}
				>
					<option value="ativo" selected>Ativo</option>
					<option value="inativo">Inativo</option>
				</select>
			</div>
			<div class="w-2/12">
				<a class="btn btn-success w-full" href="/home/fornecedor/novo"> Novo </a>
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
				<th>Contato</th>
				<th>Email</th>
				<th>Status</th>
				<th class="text-center">Ações</th>
			</tr>
		</thead>
		<tbody>
			{#each allFornecedores as f, index}
				<tr class="cursor-pointer hover:bg-base-300">
					<th>{f.id}</th>
					<td>{f.name}</td>
					<td>{f.contato}</td>
					<td>{f.email}</td>
					<td>{f.status}</td>
					<td class="text-center">
						<details class="dropdown dropdown-end dropdown-bottom">
							<summary class="btn m-1">...</summary>
							<ul class="menu dropdown-content z-50 w-52 rounded-box bg-base-100 p-2 shadow-sm">
								<li><a href="/home/fornecedor/{f.id}" class="btn btn-info mt-2">Visualizar</a></li>
								<li>
									<a href="/home/fornecedor/editar/{f.id}" class="btn btn-secondary mt-2">Editar</a>
								</li>
								<li><button class="btn btn-warning mt-2">Remover</button></li>
							</ul>
						</details>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<dialog bind:this={modalLoading} class="modal">
	<div class="modal-box flex w-2/12 justify-center">
		<span class="loading-xl loading loading-bars"></span>
	</div>
</dialog>

<div class="w-full flex justify-center mb-5">
  <div class="join">
    {#each Array(nPages) ?? [1] as n, index}
      <button class="join-item btn {page === index + 1 ? 'btn-active' : ''}" onclick={() => {page = index + 1; changeUrl()}}>{index + 1}</button>
    {/each}
  </div>
</div>