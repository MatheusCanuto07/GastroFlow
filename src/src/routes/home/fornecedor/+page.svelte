<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { filters } from '../params.svelte';
	import type { fornecedorSelect } from '$lib/server/schema/fornecedor';
	import type { InsumoSelect } from '$lib/server/schema/insumo';
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
	function handleSubmit(event: any, rota: string) {
		event?.preventDefault();
		modalLoading?.showModal();

		fetch(rota, {
			method: 'POST',
			body: new FormData(event.target)
		})
			.then((response) => response.json())
			.then((data) => {
				modalLoading?.close();
			})
			.catch((error) => console.error(error))
			.finally(() => {
				modalLoading?.close();
			});
	}

	// Conseguir os insumos de um forncedor
	let insumos: InsumoSelect[] = $state([]);
	async function getInsumos(idFornecedor: number, idUser: number) {
		if (idFornecedor) {
			const response = await fetch(`../api/insumo/${idFornecedor}/${idUser}`);
			const data = await response.json();
			insumos = data.allInsumosFromFornecedor;
		}
	}

	let selectedFornecedor: fornecedorSelect | null = $state(null);
	let disableCampos = $state(false);
</script>

{#snippet apagarFornecedor()}
	<div class="flex flex-wrap">
		<!-- <h1 class="text-2xl font-bold text-gray-900">Tem certeza que deseja apagar esse fornecedor?</h1> -->
		<p class="text-md font-semibold">ESSA AÇÃO É IRREVERSÍVEL!</p>
	</div>
{/snippet}

<div class="border px-10 pb-5 pt-2">
	<div class="flex w-full">
		<div class="breadcrumbs text-sm">
			<ul>
				<li>
					<a href="/home" class="hover:text-primary-focus transition-colors">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
							/>
						</svg>
						Home
					</a>
				</li>
				<li>
					<a href="/home/fornecedor" class="hover:text-secondary-focus font-medium transition-colors">
						Fornecedor
					</a>
				</li>
			</ul>
		</div>
	</div>
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

<div class="bg-base-10 mb-10 mt-3 h-2/4 overflow-x-auto rounded-box border border-base-content/5">
	<table class="table">
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