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
			nome: 'Farinha',
			categoria: 'Cereal',
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

	function adicionaInsumo() {
		event?.preventDefault();
		if (insumoSelectionadoId == 'Selecione') return;

		const insumo = listaInsumoDisponiveis.find(i => i.id === insumoSelectionadoId);
		if (!insumo) return;

		// Adiciona o insumo na lista selecionada e remove da disponíveis
		listaInsumoSelecionado = [...listaInsumoSelecionado, insumo];
		listaInsumoDisponiveis = listaInsumoDisponiveis.filter(
			(i) => i.id !== insumoSelectionadoId
		);

		insumoSelectionadoId = 'Selecione';
	}

	function removeInsumo(id: number) {
		event?.preventDefault();

		const insumo = listaInsumoSelecionado.find(i => i.id === id);
		if (!insumo) return;

		// Remove da selecionada e adiciona de volta na disponíveis
		listaInsumoSelecionado = listaInsumoSelecionado.filter(i => i.id !== id);
		listaInsumoDisponiveis = [...listaInsumoDisponiveis, insumo];
	}

	function sendNewForm() {
		event?.preventDefault();

		// Aqui você pode pegar os dados do formulário e insumos selecionados
		const form = new FormData(document.getElementById('formProduto') as HTMLFormElement);

		// Você pode também coletar os valores dos insumos selecionados se precisar
		// Exemplo: Quantidade de cada insumo para receita

		// Por enquanto só enviaremos o form
		// Enviar por fetch ou usar action no backend
	}

	let erroValidacao = $state('');
	let nomeReceita = $state('');
	let descricaoReceita = $state('');

	function validarFormulario() {
		event?.preventDefault();
		
		// Resetar mensagem de erro
		erroValidacao = '';
		
		// Validar campos obrigatórios
		if (!nomeReceita.trim()) {
			erroValidacao = 'O campo "Tipo de receita" é obrigatório';
			return false;
		}
		
		if (!descricaoReceita.trim()) {
			erroValidacao = 'O campo "Descrição" é obrigatório';
			return false;
		}
		
		// Se tudo estiver válido, enviar o formulário
		sendNewForm();
		return true;
	}

</script>


{#snippet novaReceita()}
	<form id="formProduto" onsubmit={validarFormulario}>
		<div class="flex flex-wrap gap-4">
			<div class="w-6/12">
				<h1>Tipo da receita</h1>
				<input
					name="nome"
					type="text"
					placeholder="Digite o tipo da receita"
					class="input input-bordered w-full"
					required
					bind:value={nomeReceita}
				/>
			</div>
			
			<div class="w-full">
				<h1>Descrição</h1>
				<textarea
					name="descricao"
					placeholder="Descrição do produto"
					class="textarea textarea-bordered w-full"
					rows="3"
					required
					bind:value={descricaoReceita}
				></textarea>
			</div>
		</div>

		<div class="w-full">
				<h1>Modo de preparo</h1>
				<textarea
					name="preparo"
					placeholder="Modo de preparo (opcional)"
					class="textarea textarea-bordered w-full"
					rows="3"
				></textarea>
			</div>
		

		<div class="mt-3 flex flex-wrap gap-4">
			<div class="w-9/12">
				<h1>Insumos (para cálculo futuro do custo)</h1>
				<select class="select w-full" bind:value={insumoSelectionadoId}>
					<option value="Selecione" selected>Selecione</option>
					{#each listaInsumoDisponiveis as item}
						<option value={item.id}>{item.nome}</option>
					{/each}
				</select>
			</div>
			<div class="flex w-3/12 flex-col">
				<button onclick={adicionaInsumo} class="btn btn-success mt-auto">
					Adicionar Insumo
				</button>
			</div>
		</div>

		<div class="min-h-40 w-full mt-4">
			<table class="table min-h-10">
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
									class="input"
									name={"quantidadeInsumo_" + i.id}
									type="number"
									min="0"
									step="0.01"
									placeholder="Quantidade"
									required
								/>
							</td>
							<td>
								<button
									class="btn btn-error btn-sm"
									onclick={() => removeInsumo(i.id)}
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
		<!-- Mensagem de erro -->
		{#if erroValidacao}
			<div class="alert alert-error mt-4">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				<span>{erroValidacao}</span>
			</div>
		{/if}

		<div class="mt-6">
			<button type="submit" class="btn btn-primary w-full">Salvar Receita</button>
		</div>
	</form>
{/snippet}

<div class="border px-16 py-5">
	<div>
		<div class="flex w-full gap-3">
			<div class="w-8/12">
				<input
					type="text"
					placeholder="Pesquisar uma resceita"
					class="input input-bordered w-full"
				/>
			</div>
			<div class="w-4/12">
				<Modal
					modalContent={novaReceita}
					textoBotao={'Nova Receita'}
					classeBotao={'btn-success w-full'}
					title="Cadastrar Nova Receita"
				/>
			</div>
		</div>
	</div>
</div>

<div class="mt-3 h-screen overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
	<table class="table">
		<thead>
			<tr>
				<th></th>
				<th>Tipo de receita</th>
				<th>Descrição</th>
				<th>Custo da receita</th>
				<th class="text-center">Ações</th>
			</tr>
		</thead>
		<tbody>
			{#each array as i, index}
				<tr class="cursor-pointer hover:bg-base-300">
					<th>{index + 1}</th>
					<td>Enbutido {i}</td>
					<td>Linguiça</td>
					<td>R$ 35,50</td>
					<td class="text-center">
						<details class="dropdown dropdown-end dropdown-bottom">
							<summary class="btn m-1">...</summary>
							<ul
								class="menu dropdown-content z-50 w-52 rounded-box bg-base-100 p-2 shadow-sm"
							>
								<li><button class="btn btn-info mt-2">Visualizar</button></li>
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
