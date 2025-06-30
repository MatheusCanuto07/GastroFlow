<script lang="ts">
  import type { produtoSelect } from '$lib/server/schema/produto';
  import type { Actions } from '@sveltejs/kit';
  interface Props {
    produto: produtoSelect | null;
    idUser : number;
    viewOnly : boolean
    isNew : boolean
  }

  let { produto, idUser, viewOnly = false, isNew = false }: Props = $props();
</script>

<div class="flex flex-wrap">
  <input type="hidden" name="id" id="id" value={produto?.id} class="hidden">
  <input type="hidden" name="idUser" id="idUser" value={1} class="hidden">
  <div class="w-6/12 pr-3">
		<h1>Nome</h1>
		<input
			disabled={viewOnly}
			name="nome"
			type="text"
			placeholder="Nome do produto"
			class="input input-bordered w-full"
			value={produto?.nome}
      required
		/>
	</div>
  <div class="w-2/12 pr-3">
		<h1>Unidade de medida</h1>
    <input
			disabled={viewOnly}
			name="unidadeMedida"
			type="text"
			placeholder="Unidade de medida"
			class="input input-bordered w-full"
			value={produto?.unidadeDeMedida}
      required
		/>
  </div>
  {#if isNew}
     <div class="w-4/12 pr-3">
		   <h1>Quantidade em estoque</h1>  
       <input
         disabled={viewOnly}
         name="quantidadeEstoque"
         type="number"
         placeholder="Quantidade em estoque"
         class="input input-bordered w-full"
         value={produto?.quantidadeEstoque}
         required
       />
     </div>
  {/if}
</div>