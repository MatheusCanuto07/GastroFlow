<script lang="ts">
	import FormReceita from "$lib/components/Formularios/FormReceita.svelte";
	import type { PageData, ActionData } from './$types';

  let { data, form }: { data: PageData; form: ActionData } = $props();
  let allInsumosFromFornecedor = $derived(data.allInsumosFromReceita);
</script>

<FormReceita />

<div class="bg-base-10 mb-10 mt-3 h-2/4 overflow-x-auto rounded-box border border-base-content/5">
	<table class="table">
		<thead>
			<tr>
				<th></th>
				<th>Nome</th>
				<th>Quantidade em estoque</th>
				<th>Custo</th>
				<th>Data Validade</th>
        <th>Quantidade necessária</th>
			</tr>
		</thead>
		<tbody>
			{#each allInsumosFromFornecedor as insumo, index}
				<tr class="cursor-pointer hover:bg-base-300">
					<th>{insumo.insumos.id}</th>
					<td>{insumo.insumos.name}</td>
					<td>{insumo.insumos.quantidadeEstoque}</td>
					<td>{insumo.insumos.custo}</td>
					<td>{insumo.insumos.dataValidade}</td>
          <td>{insumo.quantidade}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>