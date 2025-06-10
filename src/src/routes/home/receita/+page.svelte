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

<div class="p-5 max-w-4xl mx-auto">
	<h1 class="text-2xl font-bold mb-4">Cadastro de Receita</h1>

	<form on:submit|preventDefault={sendNewForm}>
		<div class="mb-4">
			<label class="block font-semibold">Nome da Receita</label>
			<input
				type="text"
				bind:value={nomeReceita}
				placeholder="Ex: Linguiça Artesanal"
				class="input input-bordered w-full"
				required
			/>
		</div>

		<div class="mb-4">
			<label class="block font-semibold">Descrição</label>
			<textarea
				bind:value={descricaoReceita}
				placeholder="Descrição opcional"
				class="textarea textarea-bordered w-full"
			></textarea>
		</div>

		<div class="mb-4 flex gap-3">
			<div class="flex-1">
				<label class="block font-semibold">Quantidade Base</label>
				<input
					type="number"
					bind:value={quantidadeBase}
					min="0.01"
					step="0.01"
					class="input input-bordered w-full"
					required
				/>
			</div>

			<div class="w-32">
				<label class="block font-semibold">Unidade</label>
				<input
					type="text"
					bind:value={unidadeBase}
					placeholder="kg, un, L..."
					class="input input-bordered w-full"
					required
				/>
			</div>
		</div>

		<div class="mb-4 flex gap-3 items-end">
			<div class="flex-1">
				<label class="block font-semibold">Insumo</label>
				<select bind:value={insumoSelecionadoId} class="select select-bordered w-full">
					<option value="Selecione" selected>Selecione</option>
					{#each listaInsumoDisponiveis as insumo}
						<option value={insumo.id}>{insumo.nome}</option>
					{/each}
				</select>
			</div>

			<div class="w-32">
				<label class="block font-semibold">Quantidade</label>
				<input
					type="number"
					bind:value={quantidadeInsumo}
					min="0.01"
					step="0.01"
					class="input input-bordered w-full"
				/>
			</div>

			<button type="button" class="btn btn-success h-10" on:click={adicionaInsumo}>
				Adicionar
			</button>
		</div>

		{#if insumosSelecionados.length > 0}
			<div class="mb-4">
				<table class="table w-full">
					<thead>
						<tr>
							<th>Nome</th>
							<th>Quantidade</th>
							<th>Custo Unitário</th>
							<th>Custo Total</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{#each insumosSelecionados as i}
							<tr>
								<td>{i.nome}</td>
								<td>{i.quantidade}</td>
								<td>R$ {i.custoUnitario.toFixed(2)}</td>
								<td>R$ {(i.custoUnitario * i.quantidade).toFixed(2)}</td>
								<td>
									<button
										type="button"
										class="btn btn-sm btn-error"
										on:click={() => removeInsumo(i.id)}
									>
										Remover
									</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}

		<div class="mb-4 font-bold text-lg">
			Custo total da receita: R$ {custoTotal().toFixed(2)}
		</div>

		<button type="submit" class="btn btn-primary w-full"> Salvar Receita </button>
	</form>
</div>
