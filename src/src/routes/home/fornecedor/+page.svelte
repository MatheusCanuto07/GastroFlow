<script lang="ts">
	import type { PageData } from './$types';
  import FormFornecedor from '$lib/components/FormFornecedor.svelte';
  import Modal from '$lib/components/Modal.svelte';

	let { data }: { data: PageData } = $props();
</script>

{#snippet novoFornecedor()}
  <FormFornecedor />
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
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th class="text-center">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr class="hover:bg-base-300">
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
        <td class="text-center">
          <details class="dropdown dropdown-bottom dropdown-end">
            <summary class="btn m-1">...</summary>
            <ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
              <li><button class="btn btn-success">Visualizar</button></li>
              <li><button class="btn btn-neutral mt-2">Editar</button></li>
            </ul>
          </details>
        </td>
      </tr>
    </tbody>
  </table>
</div>
