<script lang="ts">
  import type { receitaSelect } from '$lib/server/schema/receita';
	import type { InsumoSelect } from '$lib/server/schema/insumo';
	import type { Actions } from '@sveltejs/kit';
	interface Props {
		receita: receitaSelect | null;
		form: Actions | null;
    idUser : number;
    viewOnly : boolean
    insumos : InsumoSelect[] | null
    isNew : boolean
	}

  let { receita, form = null, idUser, viewOnly = false, insumos = null, isNew = false }: Props = $props();
</script>

<div class="flex flex-wrap gap-4">
	<div class="w-6/12">
		<h1>Tipo da receita</h1>
    {#if form?.errors?.name}
			<p class="mb-4 rounded border border-red-400 bg-red-100 p-2 text-red-500">
				Digite um tipo válido
			</p>
		{/if}
		<input
      disabled={viewOnly}
			name="nome"
			type="text"
			placeholder="Digite o tipo da receita"
			class="input input-bordered w-full"
      value="{receita?.nome}"
			required
		/>
	</div>

	<div class="w-full">
    {#if form?.errors?.descricao}
			<p class="mb-4 rounded border border-red-400 bg-red-100 p-2 text-red-500">
				Digite uma descrição válida
			</p>
		{/if}
		<h1>Descrição</h1>
		<textarea
			name="descricao"
			placeholder="Descrição do produto"
			class="textarea textarea-bordered w-full"
			rows="3"
			required
      value="{receita?.descricao}"
      disabled={viewOnly}
		></textarea>
	</div>
</div>

<div class="w-full">
	<h1>Modo de preparo</h1>
  {#if form?.errors?.modoPreparo}
		<p class="mb-4 rounded border border-red-400 bg-red-100 p-2 text-red-500">
			Digite um modo de preparo válido
	  </p>
	{/if}
	<textarea
		name="preparo"
		placeholder="Modo de preparo (opcional)"
		class="textarea textarea-bordered w-full"
		rows="3"
    value="{receita?.modoPreparo}"
    disabled={viewOnly}
	></textarea>
</div>
