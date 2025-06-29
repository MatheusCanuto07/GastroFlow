<script lang="ts">
	import Breadcrump from "$lib/components/Breadcrump.svelte";
	import FormReceita from "$lib/components/Formularios/FormReceita.svelte";
	import type { PageData, ActionData } from './$types';

  let { data, form }: { data: PageData; form: ActionData } = $props();
  let multiplicador = $state(1);
  let allInsumosFromFornecedor = $derived(data.allInsumosFromReceita);
  let receita = $derived(data.receita)
  let custoReceita = $derived(data.custoTotal)
</script>

{#snippet breadcrumpSnippet()}
  <li>
    <a href="/home/receita" class="hover:text-secondary-focus font-medium transition-colors">
      Receita
    </a>
  </li>
  <li>
    <a href="/home/receita/{receita?.id}" class="hover:text-secondary-focus font-medium transition-colors">
      {receita?.nome}
    </a>
  </li>
{/snippet}

<Breadcrump itensBreadcrumps={breadcrumpSnippet} />

<FormReceita 
  idUser={1} 
  form={null} 
  isNew={false}
  viewOnly={true}
  receita={data.receita}
/>

<div class="bg-base-10 mb-10 mt-3 h-2/4 overflow-x-auto rounded-box border border-base-content/5">
	<table class="table h-auto pb-44" style="border: none !important;">
		<thead>
			<tr>
				<th></th>
				<th>Nome</th>
				<th>Quantidade em estoque</th>
				<th>Data Validade</th>
				<th>Custo unitário</th>
        <th>Quantidade necessária</th>
        <th>Custo total</th>
			</tr>
		</thead>
		<tbody>
			{#each allInsumosFromFornecedor as insumo, index}
				<tr class="cursor-pointer hover:bg-base-300">
					<th>{insumo.insumos.id}</th>
					<td>{insumo.insumos.name}</td>
					<td>{insumo.insumos.quantidadeEstoque}</td>
					<td>{new Date(insumo.insumos.dataValidade).toLocaleDateString('pt-BR')}</td>
					<td>R$ {(insumo.insumos.custo / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
          <td>{insumo.quantidade * multiplicador}</td>
          <td>R${(insumo.quantidade * multiplicador * (insumo.insumos.custo / 100)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
				</tr>
			{/each}
		</tbody>
	</table>
  <div class="flex justify-end">
    <p class="pr-3 pb-2 text-right font-weight-bold">
      Custo total: R$ {(multiplicador * custoReceita).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
    </p>
  </div>
</div>

<form method="POST" action="?/fazerReceita" class="w-full flex justify-between mb-10">
  <div class="flex">
    <input type="hidden" name="idReceita" id="idReceita" value="{receita?.id}">
    <label for="multiplicador" class="self-center">Multiplicador :</label>
    <input bind:value={multiplicador} type="number" name="multiplicador" id="multiplicador" class="input input-bordered ml-2 flex-1">
  </div>
  <button class="btn btn-success w">Fazer receita</button>
</form>