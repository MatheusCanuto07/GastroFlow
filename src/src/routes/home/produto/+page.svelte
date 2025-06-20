<script lang="ts">
	import type { PageData } from './$types';
	import Modal from '$lib/components/Modal.svelte';

	let { data }: { data: PageData } = $props();
	let array = [1, 2, 3]; // exemplo para visualizar lista

	import { type InsumoSelect } from '$lib/server/schema/fornecedor';

	// Exemplo de insumos disponíveis para adicionar ao produto
	let listaInsumoDisponiveis: Array<InsumoSelect> = $state([
		{
			id: 1,
			idFornecedor: 1,
			nome: 'Carne de Porco',
			categoria: 'Carne',
			dataValidade: '',
			quantidadeDisponivel: '',
			createdAt: ''
		},
		{
			id: 2,
			idFornecedor: 1,
			nome: 'Sal',
			categoria: 'Temperos',
			dataValidade: '',
			quantidadeDisponivel: '',
			createdAt: ''
		}
	]);

	let listaInsumoSelecionado: Array<InsumoSelect> = $state([]);

	let insumoSelectionadoId: number | string = $state('Selecione');

	function adicionaInsumo(event: Event) {
		event.preventDefault();
		if (insumoSelectionadoId == 'Selecione') return;

		const insumo = listaInsumoDisponiveis.find((i) => i.id === insumoSelectionadoId);
		if (!insumo) return;

		// Adiciona o insumo na lista selecionada e remove da disponíveis
		listaInsumoSelecionado = [...listaInsumoSelecionado, insumo];
		listaInsumoDisponiveis = listaInsumoDisponiveis.filter((i) => i.id !== insumoSelectionadoId);

		insumoSelectionadoId = 'Selecione';
	}

	// Multiplicador padrão 1
	let multiplicador = 1;

	// Função para atualizar multiplicador
	function onMultiplicadorChange(event) {
		multiplicador = Number(event.target.value) || 1;
	}

	function removeInsumo(event: Event, id: number) {
		event.preventDefault();

		const insumo = listaInsumoSelecionado.find((i) => i.id === id);
		if (!insumo) return;

		// Remove da selecionada e adiciona de volta na disponíveis
		listaInsumoSelecionado = listaInsumoSelecionado.filter((i) => i.id !== id);
		listaInsumoDisponiveis = [...listaInsumoDisponiveis, insumo];
	}

	function sendNewForm(event: Event) {
		event.preventDefault();

		// Aqui você pode pegar os dados do formulário e insumos selecionados
		const form = new FormData(document.getElementById('formProduto') as HTMLFormElement);

		// Você pode também coletar os valores dos insumos selecionados se precisar
		// Exemplo: Quantidade de cada insumo para receita

		// Por enquanto só enviaremos o form
		// Enviar por fetch ou usar action no backend
	}

	let margemLucro = 0;
	let precoCusto = 0;
	let precoVenda = 0;

	function recalcularPrecos() {
		let novoPrecoCusto = 0;

		for (const insumo of listaInsumoSelecionado) {
			const input = document.querySelector<HTMLInputElement>(
				`input[name="quantidadeInsumo_${insumo.id}"]`
			);
			const quantidade = input ? parseFloat(input.value) || 0 : 0;

			// Exemplo de preço fixo por insumo (ajuste conforme quiser depois)
			const precoUnitario = insumo.id === 1 ? 5 : 2;

			novoPrecoCusto += quantidade * precoUnitario;
		}

		precoCusto = parseFloat(novoPrecoCusto.toFixed(2));
		precoVenda = parseFloat((precoCusto * (1 + margemLucro / 100)).toFixed(2));

		// Atualizar os inputs na tela
		const inputCusto = document.querySelector<HTMLInputElement>('input[name="precoCusto"]');
		const inputVenda = document.querySelector<HTMLInputElement>('input[name="precoVenda"]');
		if (inputCusto) inputCusto.value = precoCusto.toFixed(2);
		if (inputVenda) inputVenda.value = precoVenda.toFixed(2);
	}

	function handleMargemChange(event: Event) {
		margemLucro = parseFloat((event.target as HTMLInputElement).value) || 0;
		recalcularPrecos();
	}
</script>

{#snippet novoProduto()}
	<form id="formProduto" class="p-4">
		<div class="flex flex-wrap gap-4">
			<!-- Nome -->
			<div class="w-full md:w-6/12">
				<label class="mb-1 block font-semibold" for="nome">Nome</label>
				<input
					id="nome"
					name="nome"
					type="text"
					placeholder="Digite o nome do produto"
					class="input input-bordered w-full"
					required
				/>
			</div>

			<!-- Categoria -->
			<div class="w-full md:w-6/12">
				<label class="mb-1 block font-semibold" for="categoria">Categoria</label>
				<input
					id="categoria"
					name="categoria"
					type="text"
					placeholder="Categoria"
					class="input input-bordered w-full"
				/>
			</div>

			<!-- Quantidade em estoque -->
			<div class="w-full md:w-4/12">
				<label class="mb-1 block font-semibold" for="quantidadeEstoque">Quantidade em Estoque</label
				>
				<input
					id="quantidadeEstoque"
					name="quantidadeEstoque"
					type="number"
					min="0"
					placeholder="Quantidade"
					class="input input-bordered w-full"
				/>
			</div>

			<!-- Margem de Lucro -->
			<div class="w-full md:w-4/12">
				<label class="mb-1 block font-semibold" for="margemLucro">Margem de Lucro (%)</label>
				<input
					id="margemLucro"
					name="margemLucro"
					type="number"
					min="0"
					step="0.01"
					placeholder="Ex: 30"
					class="input input-bordered w-full"
					oninput={handleMargemChange}
				/>
			</div>

			<!-- Preço de Custo -->
			<div class="w-full md:w-4/12">
				<label class="mb-1 block font-semibold" for="precoCusto">Preço de Custo</label>
				<input
					id="precoCusto"
					name="precoCusto"
					type="number"
					min="0"
					step="0.01"
					placeholder="Preço de custo"
					class="input input-bordered w-full"
					readonly
					value="0"
				/>
			</div>

			<!-- Preço de Venda -->
			<div class="w-full md:w-4/12">
				<label class="mb-1 block font-semibold" for="precoVenda">Preço de Venda</label>
				<input
					id="precoVenda"
					name="precoVenda"
					type="number"
					min="0"
					step="0.01"
					placeholder="Preço de venda"
					class="input input-bordered w-full"
					readonly
					value="0"
				/>
			</div>

			<!-- Descrição -->
			<div class="w-full">
				<label class="mb-1 block font-semibold" for="descricao">Descrição</label>
				<textarea
					id="descricao"
					name="descricao"
					placeholder="Descrição do produto (opcional)"
					class="textarea textarea-bordered w-full"
					rows="3"
				></textarea>
			</div>
		</div>

		<!-- Insumos -->
		<div class="mt-6 flex flex-wrap items-end gap-4">
			<div class="w-full md:w-9/12">
				<label class="mb-1 block font-semibold" for="insumoSelect">
					Insumos (para cálculo futuro do custo)
				</label>
				<select id="insumoSelect" class="select w-full" bind:value={insumoSelectionadoId}>
					<option value="Selecione" selected>Selecione</option>
					{#each listaInsumoDisponiveis as item}
						<option value={item.id}>{item.nome}</option>
					{/each}
				</select>
			</div>
			<div class="flex w-full flex-col md:w-3/12">
				<button onclick={adicionaInsumo} class="btn btn-success mt-auto" type="button">
					Adicionar Insumo
				</button>
			</div>
		</div>

		<!-- Tabela de Insumos -->
		<div class="mt-6 max-h-60 w-full overflow-auto">
			<table class="table w-full">
				<thead>
					<tr>
						<th>ID</th>
						<th>Nome</th>
						<th>Quantidade Utilizada</th>
						<th>Remover</th>
					</tr>
				</thead>
				<tbody>
					{#each listaInsumoSelecionado as i}
						<tr>
							<td>{i.id}</td>
							<td>{i.nome}</td>
							<td>
								<input
									class="input input-bordered w-full"
									name={'quantidadeInsumo_' + i.id}
									type="number"
									min="0"
									step="0.01"
									placeholder="Quantidade"
									required
									oninput={recalcularPrecos}
								/>
							</td>
							<td>
								<button
									class="btn btn-error btn-sm"
									onclick={(event) => removeInsumo(event, i.id)}
									type="button"
								>
									Excluir
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</form>
{/snippet}

{#snippet Producao()}
	<form id="formProducao" class="p-4">
		<div class="mb-4">
			<label class="mb-1 block font-semibold" for="produto">Produto</label>
			<select id="produto" name="produto" class="select w-full">
				{#each array as i}
					<option value={i}>Produto {i}</option>
				{/each}
			</select>
		</div>

		<div class="mb-4">
			<label class="mb-1 block font-semibold" for="multiplicador">Multiplicador</label>
			<input
				id="multiplicador"
				name="multiplicador"
				type="number"
				min="1"
				placeholder="Multiplicador"
				class="input input-bordered w-full"
				required
			/>
		</div>

		<div class="mb-4">
			<label class="mb-1 block font-semibold">Insumos Utilizados</label>
			<div
				id="insumos"
				class="input input-bordered h-24 w-full overflow-auto bg-gray-50"
				aria-live="polite"
			>
				<!-- Insumos do produto selecionado vão aparecer aqui -->
			</div>
		</div>

		<div class="mb-4">
			<label class="mb-1 block font-semibold" for="data">Data de Produção</label>
			<input id="data" name="data" type="date" class="input input-bordered w-full" />
		</div>

		<button class="btn btn-primary w-full" type="submit">Registrar Produção</button>
	</form>
{/snippet}

<div class="border px-16 py-5">
	<div>
		<div class="flex w-full gap-3">
			<div class="w-8/12">
				<input type="text" placeholder="Pesquisar um produto" class="input input-bordered w-full" />
			</div>
			<div class="flex w-6/12 gap-3">
				<Modal
					modalContent={novoProduto}
					textoBotao={'Novo Produto'}
					classeBotao={'btn-success px-4 py-2 text-sm'}
					title="Cadastrar Novo Produto"
				/>

				<Modal
					modalContent={Producao}
					textoBotao={'Produção'}
					classeBotao={'btn-warning px-4 py-2 text-sm'}
					title="Registrar Produção"
				/>
			</div>
		</div>
	</div>
</div>

<div class="rounded-box border-base-content/5 bg-base-100 mt-3 h-screen overflow-x-auto border">
	<table class="table">
		<thead>
			<tr>
				<th></th>
				<th>Nome</th>
				<th>Categoria</th>
				<th>Quantidade em estoque</th>
				<th>Preço de venda</th>
				<th class="text-center">Ações</th>
			</tr>
		</thead>
		<tbody>
			{#each array as i, index}
				<tr class="hover:bg-base-300 cursor-pointer">
					<th>{index + 1}</th>
					<td>Produto {i}</td>
					<td>Categoria Exemplo</td>
					<td>10</td>
					<td>R$ 45,00</td>
					<td class="text-center">
						<details class="dropdown dropdown-end dropdown-bottom">
							<summary class="btn m-1">...</summary>
							<ul class="menu dropdown-content rounded-box bg-base-100 z-50 w-52 p-2 shadow-sm">
								<li><button class="btn btn-info mt-2"> Visualizar </button></li>
								<li><button class="btn btn-secondary mt-2">Editar</button></li>
								<li><button class="btn btn-warning mt-2">Remover</button></li>
							</ul>
						</details>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
