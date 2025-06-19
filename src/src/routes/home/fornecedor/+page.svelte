<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import Modal from '$lib/components/Modal.svelte';
  import { enhance } from "$app/forms";
	import { onMount } from 'svelte';
  import { filters } from "../params.svelte";
	let {data, form}: {data : PageData; form: ActionData} = $props();
  const allFornecedores = data.allfornecedores?.allfornecedores;
  const idUser = data.idUser ?? 1;

  async function getInsumos() {
		const response = await fetch('../api');
    const number = await response.json();
	}
  let search = $state("");
  let searchCategory = $state("");
  let searchParams : string | null = "";
  let searchCategoryParams : string | null = "";
  function changeUrl(){
    searchParams = filters.get(search);
    searchCategoryParams = filters.get(searchCategory);
    filters.update({search : search, category : searchCategory})
  }

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

  onMount(() => {
    getInsumos();
  })

</script>

{#snippet novoFornecedor()}
  <div class="flex flex-wrap">
    <div class="w-9/12 pr-3">
      <h1>Nome</h1>
        {#if form?.errors?.name}
          <p class="text-red-500 bg-red-100 border border-red-400 p-2 rounded mb-4">Digite um nome válido</p>
        {/if}
      <input name="nome" type="text" placeholder="Type here" class="input input-bordered w-full" value="trsete" />
    </div>
    <div class="w-3/12">
      <h1>Status</h1>
      {#if form?.errors?.status}
        <p class="text-red-500 bg-red-100 border border-red-400 p-2 rounded mb-4">Digite um status válido</p>
      {/if}
      <select name="status" class="select select-bordered w-full">
        <option value="ativo" selected>Ativo</option>
        <option value="inativo">Inativo</option>
      </select>
    </div>
    <div class="w-4/12 pr-3">
      <h1>Telefone</h1>
      {#if form?.errors?.telefone}
        <p class="text-red-500 bg-red-100 border border-red-400 p-2 rounded mb-4">Digite um telefone válido</p>
      {/if}
      <input
        name="telefone"
        type="number"
        placeholder="Type here"
        class="input input-bordered w-full"
        value="21321313"
      />
    </div>
    <div class="w-8/12">
      <h1>E-mail</h1>
      {#if form?.errors?.email}
        <p class="text-red-500 bg-red-100 border border-red-400 p-2 rounded mb-4">Digite um email válido</p>
      {/if}
      <input
        name="email"
        type="email"
        value="atendimento@extra.br.com"
        placeholder="Type here"
        class="input input-bordered w-full"
      />
    </div>
  </div>

  <div class="mt-3 flex flex-wrap">
    <div class="w-9/12">
      <h1>Insumo</h1>
    </div>
    <div class="flex w-3/12 flex-col">
      <!-- <button onclick={adicionaInsumo} class="btn btn-success mt-auto">Adicionar Insumo</button> -->
    </div>
    <div class="min-h-40 w-full">
      <table class="table min-h-10">
        <thead>
          <tr>
            <td>ID</td>
            <td>Nome</td>
            <td>Valor</td>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  </div>
{/snippet}

{#snippet visualizarFornecedor()}
	<div class="flex">
		<table class="table">
			<thead>
				<tr>
					<th></th>
					<th>Nome</th>
					<th>Categoria</th>
					<th>Quantidade em estoque</th>
					<th>Estoque mínimo</th>
				</tr>
			</thead>
			<tbody>
				<!-- {#each array as i, index}
					<tr>
						<th>{index}</th>
						<th>Farinha</th>
						<th>Sei lá</th>
						<th>33</th>
						<th>12</th>
					</tr>
				{/each} -->
			</tbody>
		</table>
	</div>
{/snippet}

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
        <form method="POST" action="?/novofornecedor" use:enhance onsubmit={(event) => handleSubmit(event, "?/novofornecedor")}>
          <input type="hidden" name="idUser" id="idUser" value={idUser}>
          <Modal
            modalContent={novoFornecedor}
            textoBotao={'Novo'}
            classeBotao={'btn-success w-full'}
            title="Cadastrar Novo Fornecedor"
          />
        </form>
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
              <ul class="menu dropdown-content z-50 w-52 rounded-box bg-base-100 p-2 shadow-sm">
                <div>
                  <Modal
                    classeBotao="success w-full"
                    textoBotao="Visualizar"
                    title="Visualizar"
                    tamanhoModal="w-11/12 max-w-5xl"
                    modalContent={visualizarFornecedor}
                  />
                  <input type="hidden" name="idUser" id="idUser" value={f.idUser}>
                </div>
                <form method="POST" action="?/editarfornecedor">
                  
                  <Modal
                    classeBotao="btn-info w-full mt-2"
                    textoBotao="Editar"
                    title="Editar Fornecedor "
                    tamanhoModal="w-11/12 max-w-5xl"
                    modalContent={visualizarFornecedor}
                  />
                </form>
                <div>
                  <form action="?/apagarFornecedor" 
                    method="POST">
                    
                    <input type="hidden" name="idFornecedor" id="idFornecedor" value={f.id}>
                    <Modal 
                      classeBotao="btn-error w-full mt-2"
                      textoBotao="Apagar"
                      textBtn="Quero apagar"
                      title="Apagar"        
                      tamanhoModal="w-3/12 max-w-5xl"
                      classBtnEnviar ="error"
                      modalContent={apagarFornecedor}
                    />
                  </form>
                </div>
                <li>
                  <button class="btn btn-success mt-2">Realizar Compra</button>
                </li>
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
