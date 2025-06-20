<script lang="ts">
	import type { fornecedorSelect } from '$lib/server/schema/fornecedor';
	import type { InsumoSelect } from '$lib/server/schema/insumo';
	import type { Actions } from '@sveltejs/kit';
	interface Props {
		fornecedor: fornecedorSelect | null;
		form: Actions | null;
    idUser : number;
    viewOnly : boolean
    insumos : InsumoSelect[] | null
    isNew : boolean
	}

	let { fornecedor, form = null, idUser, viewOnly = false, insumos = null, isNew = false }: Props = $props();
</script>

<div class="flex flex-wrap">
	<input type="hidden" name="idUser" id="idUser" value={idUser} />
	<input type="hidden" name="id" id="id" value={fornecedor?.id} />
	<div class="w-9/12 pr-3">
		<h1>Nome</h1>
		{#if form?.errors?.name}
			<p class="mb-4 rounded border border-red-400 bg-red-100 p-2 text-red-500">
				Digite um nome válido
			</p>
		{/if}
		<input
			disabled={viewOnly}
			name="nome"
			type="text"
			placeholder="Type here"
			class="input input-bordered w-full"
			value={fornecedor?.name}
		/>
	</div>
	<div class="w-3/12">
		<h1>Status</h1>
		{#if form?.errors?.status}
			<p class="mb-4 rounded border border-red-400 bg-red-100 p-2 text-red-500">
				Digite um status válido
			</p>
		{/if}
		<select
      id="status"
			name="status"
			class="select select-bordered w-full"
			value={fornecedor?.status}
			disabled={viewOnly}
		>
			<option value="ativo" selected>Ativo</option>
			<option value="inativo">Inativo</option>
		</select>
	</div>
	<div class="w-4/12 pr-3">
		<h1>Telefone</h1>
		{#if form?.errors?.telefone}
			<p class="mb-4 rounded border border-red-400 bg-red-100 p-2 text-red-500">
				Digite um telefone válido
			</p>
		{/if}
		<input
			name="telefone"
			type="number"
			placeholder="Type here"
			class="input input-bordered w-full"
			value={fornecedor?.telefone}
			disabled={viewOnly}
		/>
	</div>
	<div class="w-8/12">
		<h1>E-mail</h1>
		{#if form?.errors?.email}
			<p class="mb-4 rounded border border-red-400 bg-red-100 p-2 text-red-500">
				Digite um email válido
			</p>
		{/if}
		<input
			name="email"
			type="email"
			placeholder="Type here"
			class="input input-bordered w-full"
			value={fornecedor?.email}
			disabled={viewOnly}
		/>
	</div>
</div>

{#if !isNew}
  {#if insumos}
    <h1 class="text-center text-xl font-semibold">Esse fornecedor não tem insumos cadastrados!</h1>
    {:else}
    <div class="mt-3 flex flex-wrap">
      <div class="w-full">
        <h1 class="text-center text-xl font-semibold">Insumo</h1>
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
            {#each (insumos || []) as i}
              <tr class="cursor-pointer hover:bg-base-300">
                <td>{i.id}</td>
                <td>{i.name}</td>
                <td>{i.custo}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  {/if}
{/if}
