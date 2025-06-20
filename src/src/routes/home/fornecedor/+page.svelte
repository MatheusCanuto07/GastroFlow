<script lang="ts">
	import type { PageData, ActionData } from '../../$types';
	import Modal from '$lib/components/Modal.svelte';
  import { enhance } from "$app/forms";
  import { filters } from "../params.svelte";
	import type { fornecedorSelect } from '$lib/server/schema/fornecedor';
	import type { InsumoSelect } from '$lib/server/schema/insumo';
	let {data, form}: {data : PageData; form: ActionData} = $props();

  // Dados de quando a página carrega
  const allFornecedores = data.allfornecedores;
  const idUser = data ?? 1;

  // Lógica da pesquisa
  let search = $state("");
  let searchCategory = $state("");
  async function changeUrl(){
    filters.update({search : search, category : searchCategory})
  }

  // Lógica de envio dos formulários
  let modalLoading : HTMLDialogElement | undefined  = $state();
  function handleSubmit (event : any, rota : string) {
    event?.preventDefault();
    modalLoading?.showModal()    
    
    fetch(rota, {
      method: 'POST',
      body: new FormData(event.target),
    })
    .then(response => response.json())
    .then(data => {
      modalLoading?.close();
    })
    .catch(error => console.error(error))
    .finally(() => {
      modalLoading?.close();
    });
  }

  // Conseguir os insumos de um forncedor
  let insumos : InsumoSelect[] = $state([]);
  async function getInsumos(idFornecedor : number, idUser : number) {
    if(idFornecedor){
      const response = await fetch(`../api/insumo/${idFornecedor}/${idUser}`);
      const data = await response.json();
      insumos = data.allInsumosFromFornecedor;
    }
	}

  let selectedFornecedor : fornecedorSelect | null = $state(null);
  let disableCampos = $state(false);
</script>

<div class="breadcrumbs text-sm">
  <ul>
    <li><a href="/home">Home</a></li>
    <li><a href="/home/fornecedor">Fornecedor</a></li>
  </ul>
</div>

{#snippet apagarFornecedor()}
  <div class="flex flex-wrap">
    <!-- <h1 class="text-2xl font-bold text-gray-900">Tem certeza que deseja apagar esse fornecedor?</h1> -->
    <p class="text-md font-semibold">ESSA AÇÃO É IRREVERSÍVEL!</p>
  </div>
{/snippet}

<div class="border px-16 py-5">
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
				<select class="select select-bordered w-full" bind:value={searchCategory} onchange={changeUrl}>
					<option value="" selected>Status</option>
					<option value="teste2">Crimson</option>
					<option value="test3e">Amber</option>
					<option value="teste4">Velvet</option>
				</select>
			</div>
			<div class="w-2/12">
        <a class="btn btn-success w-full" href="/home/fornecedor/novo">
          Novo
        </a>
			</div>
		</div>
	</div>
</div>

<div class="mb-10 mt-3 h-2/4 overflow-x-auto rounded-box border border-base-content/5 bg-base-10">
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
      {#each (allFornecedores || [])  as f, index}
        <tr class="cursor-pointer hover:bg-base-300">
          <th>{f.id}</th>
          <td>{f.name}</td>
          <td>{f.contato}</td>
          <td>{f.email}</td>
          <td>{f.status}</td>
          <td class="text-center">
            <details class="dropdown dropdown-end dropdown-bottom">
              <summary class="btn m-1">...</summary>
              <ul class="menu dropdown-content rounded-box bg-base-100 z-50 w-52 p-2 shadow-sm">
                <li><a href="/home/fornecedor/{f.id}" class="btn btn-info mt-2">Visualizar</a></li>
                <li><a href="/home/fornecedor/editar/{f.id}" class="btn btn-secondary mt-2">Editar</a></li>
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
  <div class="modal-box flex justify-center w-2/12">
    <span class="loading loading-bars loading-xl"></span>
  </div>
</dialog>
