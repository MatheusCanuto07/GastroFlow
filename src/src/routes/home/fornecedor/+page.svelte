<script lang="ts">
	import type { PageData } from './$types';
  import FormFornecedor from '$lib/components/FormFornecedor.svelte';
  import Modal from '$lib/components/Modal.svelte';

	let { data }: { data: PageData } = $props();
  let array = [1,2,3];
</script>

{#snippet novoFornecedor()}
  <FormFornecedor />
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
        {#each array as i, index}
          <tr>
            <th>{index}</th>
            <th>Farinha</th>
            <th>Sei lá</th>
            <th>33</th>
            <th>12</th>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/snippet}

<div class="border px-16 py-5">
	<form action="POST">
		<div class="flex w-full gap-3">
			<div class="w-8/12">
				<input
					type="text"
					placeholder="Pesquisar um fornecedor"
					class="input input-bordered w-full"
				/>
			</div>
			<div class="w-2/12">
				<select class="select select-bordered w-full">
					<option disabled selected>Status</option>
					<option>Crimson</option>
					<option>Amber</option>
					<option>Velvet</option>
				</select>
			</div>
			<div class="w-2/12">
				<Modal modalContent={novoFornecedor} textoBotao={"Novo"} classeBotao={"btn-success w-full"} title="Cadastrar Novo Fornecedor"/>
			</div>
		</div>
	</form>
</div>

<div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-3 h-screen">
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
      {#each array as i, index }
        <tr class="hover:bg-base-300 cursor-pointer">
          <th>{index + 1}</th>
          <td>Extra</td>
          <td>(31) 9 9978-4358</td>
          <td>atendimento@extra.com.br</td>
          <td>Ativo</td>
          <td class="text-center">
            <details class="dropdown dropdown-bottom dropdown-end ">
              <summary class="btn m-1">...</summary>
              <ul class="menu dropdown-content bg-base-100 rounded-box z-50 w-52 p-2 shadow-sm">
                <Modal 
                  classeBotao="success" 
                  textoBotao="Visualizar" 
                  title="Visualizar" 
                  tamanhoModal="w-11/12 max-w-5xl"
                  modalContent={visualizarFornecedor}/>
                <li><button class="btn btn-neutral mt-2">Editar</button></li>
                <li><button class="btn btn-neutral mt-2">Realizar Compra</button></li>
              </ul>
            </details>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
