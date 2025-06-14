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

<h1>Produção</h1>
