<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;

	// Receitas com insumos e seus estoques, do load
	let receitas = data.receitas ?? [];

	let receitaSelecionadaId: number | null = null;
	let receitaSelecionada = null;
	let quantidade = 1;
	let mensagem = '';
	let erro = '';
	let processando = false;

	// Atualiza receitaSelecionada com base no id escolhido
	$: receitaSelecionada = receitas.find((r) => r.id === receitaSelecionadaId) ?? null;

	// Calcula se pode produzir baseado no estoque dos insumos e quantidade
	$: podeProduzir = receitaSelecionada
		? receitaSelecionada.insumos.every((ri) => ri.estoque >= ri.quantidade * quantidade) &&
			quantidade > 0
		: false;

	async function produzir(event: Event) {
		event.preventDefault();
		erro = '';
		mensagem = '';
		if (!podeProduzir) {
			erro = 'Estoque insuficiente ou quantidade inválida.';
			return;
		}
		processando = true;

		const formData = new FormData();
		formData.append('receitaId', receitaSelecionadaId.toString());
		formData.append('quantidade', quantidade.toString());

		const res = await fetch('?/', { method: 'POST', body: formData });
		const json = await res.json();

		if (json.success) {
			mensagem = json.message;
			// Atualizar localmente os estoques após produção
			receitaSelecionada.insumos.forEach((insumo) => {
				insumo.estoque -= insumo.quantidade * quantidade;
			});
			// Opcional: resetar quantidade
			quantidade = 1;
		} else {
			erro = json.message || 'Erro desconhecido';
		}
		processando = false;
	}
</script>

<form on:submit={produzir} class="flex flex-col gap-4 max-w-lg">
	<label>
		Receita:
		<select bind:value={receitaSelecionadaId} required>
			<option value="" disabled selected>Selecione a receita</option>
			{#each receitas as receita}
				<option value={receita.id}>{receita.nome}</option>
			{/each}
		</select>
	</label>

	{#if receitaSelecionada}
		<div>
			<h3>Insumos necessários:</h3>
			<table class="table-auto border-collapse border border-gray-300">
				<thead>
					<tr>
						<th class="border border-gray-300 px-2">Insumo</th>
						<th class="border border-gray-300 px-2">Qtd receita</th>
						<th class="border border-gray-300 px-2">Estoque atual</th>
						<th class="border border-gray-300 px-2">Qtd necessária</th>
					</tr>
				</thead>
				<tbody>
					{#each receitaSelecionada.insumos as insumo}
						<tr>
							<td class="border border-gray-300 px-2">{insumo.nome}</td>
							<td class="border border-gray-300 px-2">{insumo.quantidade}</td>
							<td class="border border-gray-300 px-2">{insumo.estoque}</td>
							<td class="border border-gray-300 px-2">{insumo.quantidade * quantidade}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<label>
			Quantidade a produzir:
			<input type="number" min="1" bind:value={quantidade} required />
		</label>

		<button type="submit" disabled={!podeProduzir || processando} class="btn btn-primary">
			{processando ? 'Produzindo...' : 'Produzir'}
		</button>
	{/if}

	{#if mensagem}
		<p class="text-green-600">{mensagem}</p>
	{/if}
	{#if erro}
		<p class="text-red-600">{erro}</p>
	{/if}
</form>
