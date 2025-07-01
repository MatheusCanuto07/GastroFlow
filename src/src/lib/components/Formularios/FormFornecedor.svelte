<script lang="ts">
	import type { fornecedorSelect } from '$lib/server/schema/fornecedor';
	import type { InsumoSelect } from '$lib/server/schema/insumo';
	import type { Actions } from '@sveltejs/kit';
	interface Props {
		fornecedor: fornecedorSelect | null;
		form: Actions | null;
    idUser : number;
    viewOnly : boolean
    insumos : {
      insumo : InsumoSelect
      preco : number | null
    }[]
    isNew : boolean
	}

	let { fornecedor, form = null, idUser, viewOnly = false, insumos, isNew = false }: Props = $props();
</script>

<div class="flex flex-wrap">
	<input type="hidden" name="idUser" id="idUser" value={idUser} />
	<input type="hidden" name="id" id="id" value={fornecedor?.id} />
	<div class="w-9/12 pr-3">
		<h1>Nome</h1>
		<input
			disabled={viewOnly}
			name="nome"
			type="text"
			placeholder="Type here"
			class="input input-bordered w-full"
			value={fornecedor?.name}
      required
		/>
	</div>
	<div class="w-3/12">
		<h1>Status</h1>
		<select
      id="status"
			name="status"
			class="select select-bordered w-full"
			value={fornecedor?.status}
			disabled={viewOnly}
      required
		>
			<option value="ativo" selected>Ativo</option>
			<option value="inativo">Inativo</option>
		</select>
	</div>
	<div class="w-4/12 pr-3">
		<h1>Telefone</h1>
		<input
			name="telefone"
			type="number"
			placeholder="Type here"
			class="input input-bordered w-full"
			value={fornecedor?.telefone}
			disabled={viewOnly}
      required
		/>
	</div>
	<div class="w-8/12">
		<h1>E-mail</h1>
		<input
			name="email"
			type="email"
			placeholder="Type here"
			class="input input-bordered w-full"
			value={fornecedor?.email}
			disabled={viewOnly}
      required
		/>
	</div>
</div>

{#if !isNew}
  {#if insumos.length > 0}
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
            {#each insumos as i}
              <tr class="cursor-pointer hover:bg-base-300">
                <td>{i.insumo.id}</td>
                <td>{i.insumo.name}</td>
                <td>{i.preco}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  {/if}
{/if}
