<script lang="ts">
	import type { PageData } from './$types';
	import Modal from '$lib/components/Modal.svelte';

	// Tipagem dos insumos (ajuste conforme seu schema real)
	import type { InsumoSelect } from '$lib/server/schema/fornecedor';

	let { data }: { data: PageData } = $props();

	let listaInsumoDisponiveis: Array<InsumoSelect> = $state([
		{ id: 1, nome: 'Farinha', custoUnitario: 10 },
		{ id: 2, nome: 'Sal', custoUnitario: 2 }
		// ... adicione mais conforme necessário
	]);

	// Insumos adicionados na receita com quantidade
	let insumosSelecionados: Array<{
		id: number;
		nome: string;
		custoUnitario: number;
		quantidade: number;
	}> = $state([]);

	let insumoSelecionadoId: number | string = $state('Selecione');
	let quantidadeInsumo: number = $state(0);

	// Campos da receita
	let nomeReceita = $state('');
	let descricaoReceita = $state('');
	let quantidadeBase = $state(1);
	let unidadeBase = $state('kg');

	// Calcula custo total da receita somando custoUnitario * quantidade dos insumos selecionados
	function custoTotal() {
		return insumosSelecionados.reduce((total, i) => total + i.custoUnitario * i.quantidade, 0);
	}

	function adicionaInsumo() {
		event?.preventDefault();
		if (insumoSelecionadoId === 'Selecione' || quantidadeInsumo <= 0) return;

		// Verifica se insumo já está na lista, atualiza quantidade se sim
		const index = insumosSelecionados.findIndex((i) => i.id === insumoSelecionadoId);
		if (index >= 0) {
			insumosSelecionados[index].quantidade += quantidadeInsumo;
		} else {
			const insumo = listaInsumoDisponiveis.find((i) => i.id === insumoSelecionadoId);
			if (insumo) {
				insumosSelecionados.push({
					id: insumo.id,
					nome: insumo.nome,
					custoUnitario: insumo.custoUnitario,
					quantidade: quantidadeInsumo
				});
			}
		}
		// Reseta seleção
		insumoSelecionadoId = 'Selecione';
		quantidadeInsumo = 0;
	}

	function removeInsumo(id: number) {
		insumosSelecionados = insumosSelecionados.filter((i) => i.id !== id);
	}

	function sendNewForm() {
		event?.preventDefault();

		if (!nomeReceita.trim() || insumosSelecionados.length === 0 || quantidadeBase <= 0) {
			alert('Preencha nome, insumos e quantidade base válidos');
			return;
		}

		// Construir objeto para envio
		const receita = {
			nome: nomeReceita,
			descricao: descricaoReceita,
			insumos: insumosSelecionados.map((i) => ({ id: i.id, quantidade: i.quantidade })),
			quantidadeBase,
			unidadeBase,
			custoTotal: custoTotal()
		};

		// Aqui você faz o POST para o backend via fetch, ou via formulário normal
		console.log('Enviando receita:', receita);

		// reset form se quiser
	}
</script>

<h1>Receita</h1>