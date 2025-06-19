<script lang="ts">
	import type { PageData } from './$types';
	import Modal from '$lib/components/Modal.svelte';

	export let data: PageData;

	let listaInsumoDisponiveis = [...data.insumos];
	let listaInsumoSelecionado = [];

	let insumoSelectionadoId: number | string = 'Selecione';
	let margemLucro = 0;
	let precoCusto = 0;
	let precoVenda = 0;

	let produtoVisualizar = null;
	let produtoEditar = null;

	function abrirVisualizar(produto) {
		produtoVisualizar = produto;
	}

	function fecharVisualizar() {
		produtoVisualizar = null;
	}

	function abrirEditar(produto) {
		produtoEditar = { ...produto }; // clone para edição
	}

	function fecharEditar() {
		produtoEditar = null;
	}

	function salvarEdicao() {
		const idx = data.produtos.findIndex((p) => p.id === produtoEditar.id);
		if (idx > -1) {
			data.produtos[idx] = { ...produtoEditar };
		}
		produtoEditar = null;
	}

	function removerProduto(id) {
		if (confirm('Tem certeza que deseja remover este produto?')) {
			data.produtos = data.produtos.filter((p) => p.id !== id);
		}
	}

	function adicionaInsumo(event: Event) {
		event.preventDefault();
		if (insumoSelectionadoId == 'Selecione') return;

		const insumo = listaInsumoDisponiveis.find((i) => i.id === insumoSelectionadoId);
		if (!insumo) return;

		listaInsumoSelecionado = [...listaInsumoSelecionado, insumo];
		listaInsumoDisponiveis = listaInsumoDisponiveis.filter((i) => i.id !== insumoSelectionadoId);
		insumoSelectionadoId = 'Selecione';
	}

	function removeInsumo(event: Event, id: number) {
		event.preventDefault();

		const insumo = listaInsumoSelecionado.find((i) => i.id === id);
		if (!insumo) return;

		listaInsumoSelecionado = listaInsumoSelecionado.filter((i) => i.id !== id);
		listaInsumoDisponiveis = [...listaInsumoDisponiveis, insumo];
	}

	function recalcularPrecos() {
		let novoPrecoCusto = 0;

		for (const insumo of listaInsumoSelecionado) {
			const input = document.querySelector<HTMLInputElement>(
				`input[name="quantidadeInsumo_${insumo.id}"]`
			);
			const quantidade = input ? parseFloat(input.value) || 0 : 0;
			const precoUnitario = insumo.id === 1 ? 5 : 2;
			novoPrecoCusto += quantidade * precoUnitario;
		}

		precoCusto = parseFloat(novoPrecoCusto.toFixed(2));
		precoVenda = parseFloat((precoCusto * (1 + margemLucro / 100)).toFixed(2));

		const inputCusto = document.querySelector<HTMLInputElement>('input[name="precoCusto"]');
		const inputVenda = document.querySelector<HTMLInputElement>('input[name="precoVenda"]');
		if (inputCusto) inputCusto.value = precoCusto.toFixed(2);
		if (inputVenda) inputVenda.value = precoVenda.toFixed(2);
	}

	function handleMargemChange(event: Event) {
		margemLucro = parseFloat((event.target as HTMLInputElement).value) || 0;
		recalcularPrecos();
	}

	let filtroBusca = '';
	let produtosFiltrados = [];

	// Supondo que 'data.produtos' seja o array com os produtos do backend
	$: produtosFiltrados = filtroBusca
		? data.produtos.filter((p) => p.nome.toLowerCase().includes(filtroBusca.toLowerCase()))
		: data.produtos;

	type FichaTecnica = {
		id: number;
		nome: string;
		insumos: Array<{ id: number; nome: string }>;
	};

	let fichasTecnicas: FichaTecnica[] = [
		{
			id: 1,
			nome: 'Hambúrguer de Porco',
			insumos: [
				{ id: 1, nome: 'Carne de Porco' },
				{ id: 2, nome: 'Sal' }
			]
		},
		{
			id: 2,
			nome: 'Tempero Especial',
			insumos: [
				{ id: 2, nome: 'Sal' },
				{ id: 3, nome: 'Pimenta' }
			]
		}
	];

	let fichaTecnicaSelecionadaId: number | string = '';

	function handleFichaTecnicaChange() {
		const ficha = fichasTecnicas.find((f) => f.id == fichaTecnicaSelecionadaId);
		if (!ficha) return;

		// Limpa insumos já selecionados
		listaInsumoSelecionado = [];

		// Adiciona os insumos da ficha técnica
		for (const insumo of ficha.insumos) {
			const insumoDisponivel = listaInsumoDisponiveis.find((i) => i.id === insumo.id);
			if (insumoDisponivel) {
				listaInsumoSelecionado = [...listaInsumoSelecionado, insumoDisponivel];
				listaInsumoDisponiveis = listaInsumoDisponiveis.filter((i) => i.id !== insumo.id);
			}
		}

		// Recalcula o preço, caso precise
		recalcularPrecos();
	}
</script>

<!-- FORM NOVO PRODUTO -->
{#snippet novoProduto()}
	<form id="formProduto" method="POST" action="?/criarProduto" class="p-4">
		<div class="mb-2">
			<label>Nome</label>
			<input name="nome" type="text" required class="input input-bordered w-full" />
		</div>

		<div class="mb-2">
			<label>Categoria</label>
			<input name="categoria" type="text" class="input input-bordered w-full" />
		</div>

		<div class="mb-2">
			<label>Quantidade Estoque</label>
			<input name="quantidadeEstoque" type="number" min="0" class="input input-bordered w-full" />
		</div>

		<div class="mb-2">
			<label>Margem Lucro (%)</label>
			<input
				name="margemLucro"
				type="number"
				min="0"
				step="0.01"
				oninput={handleMargemChange}
				class="input input-bordered w-full"
			/>
		</div>

		<div class="mb-2">
			<label>Preço Custo</label>
			<input
				name="precoCusto"
				type="number"
				step="0.01"
				readonly
				class="input input-bordered w-full"
			/>
		</div>

		<div class="mb-2">
			<label>Preço Venda</label>
			<input
				name="precoVenda"
				type="number"
				step="0.01"
				readonly
				class="input input-bordered w-full"
			/>
		</div>

		<div class="mb-2">
			<label>Descrição</label>
			<textarea name="descricao" class="textarea textarea-bordered w-full"></textarea>
		</div>

		<div class="mb-2">
			<label>Ficha Técnica</label>
			<select
				name="fichaTecnicaId"
				bind:value={fichaTecnicaSelecionadaId}
				class="select select-bordered w-full"
				onchange={handleFichaTecnicaChange}
			>
				<option value="">Selecione uma ficha técnica</option>
				{#each fichasTecnicas as ficha}
					<option value={ficha.id}>{ficha.nome}</option>
				{/each}
			</select>
		</div>

		<div class="mb-2">
			<label>Adicionar Insumos</label>
			<select bind:value={insumoSelectionadoId} class="select w-full">
				<option value="Selecione">Selecione</option>
				{#each listaInsumoDisponiveis as i}
					<option value={i.id}>{i.nome}</option>
				{/each}
			</select>
			<button onclick={adicionaInsumo} class="btn btn-sm btn-success mt-2">Adicionar Insumo</button>
		</div>

		<!-- Insumos Selecionados -->
		{#each listaInsumoSelecionado as i}
			<div class="mb-1 flex items-center gap-2">
				<span>{i.nome}</span>
				<input
					name={'quantidadeInsumo_' + i.id}
					type="number"
					min="0"
					step="0.01"
					oninput={recalcularPrecos}
					class="input input-bordered w-20"
				/>
				<button onclick={(e) => removeInsumo(e, i.id)} class="btn btn-error btn-sm">Remover</button>
			</div>
		{/each}

		<button type="submit" class="btn btn-primary mt-4">Salvar Produto</button>
	</form>
{/snippet}

<!-- FORM REGISTRAR PRODUÇÃO -->
{#snippet Producao()}
	<form id="formProducao" method="POST" action="?/registrarProducao" class="p-4">
		<div class="mb-2">
			<label>Produto</label>
			<select name="produto" required class="select w-full">
				{#each data.produtos as p}
					<option value={p.id}>{p.nome}</option>
				{/each}
			</select>
		</div>

		<div class="mb-2">
			<label>Multiplicador</label>
			<input
				name="multiplicador"
				type="number"
				min="1"
				value="1"
				class="input input-bordered w-full"
			/>
		</div>

		<button type="submit" class="btn btn-warning">Registrar Produção</button>
	</form>
{/snippet}

<!-- Botões para abrir os modais -->
<div class="mt-4 flex gap-3">
	<div class="w-6/12">
		<input
			type="text"
			placeholder="Pesquisar um produto"
			class="input input-bordered w-full"
			bind:value={filtroBusca}
		/>
	</div>

	<Modal
		modalContent={novoProduto}
		textoBotao={'Novo Produto'}
		classeBotao={'btn-success'}
		title="Cadastrar Novo Produto"
	/>

	<Modal
		modalContent={Producao}
		textoBotao={'Produção'}
		classeBotao={'btn-warning'}
		title="Registrar Produção"
	/>
</div>

<!-- TABELA DE PRODUTOS -->
<div class="mt-4">
	<table class="table w-full">
		<thead>
			<tr>
				<th>#</th>
				<th>Nome</th>
				<th>Categoria</th>
				<th>Estoque</th>
				<th>Preço Venda</th>
			</tr>
		</thead>
		<tbody>
			{#each data.produtos as produto, index}
				<tr>
					<td>{index + 1}</td>
					<td>{produto.nome}</td>
					<td>{produto.categoria}</td>
					<td>{produto.quantidadeEstoque}</td>
					<td>{produto.precoVenda}</td>
				</tr>
			{/each}
		</tbody>
		<tbody>
			{#each produtosFiltrados as produto, index}
				<tr class="hover:bg-base-300 cursor-pointer">
					<th>{index + 1}</th>
					<td>{produto.nome}</td>
					<td>{produto.categoria}</td>
					<td>{produto.quantidadeEstoque}</td>
					<td>R$ {produto.precoVenda.toFixed(2)}</td>
					<td class="text-center">
						<details class="dropdown dropdown-end dropdown-bottom">
							<summary class="btn m-1">...</summary>
							<ul class="menu dropdown-content rounded-box bg-base-100 z-50 w-52 p-2 shadow-sm">
								<li><button class="btn btn-info mt-2">Visualizar</button></li>
								<li><button class="btn btn-secondary mt-2">Editar</button></li>
								<li><button class="btn btn-warning mt-2">Remover</button></li>
							</ul>
						</details>
					</td>
				</tr>
			{/each}
			{#if produtosFiltrados.length === 0}
				<tr>
					<td colspan="6" class="text-center">Nenhum produto encontrado.</td>
					<td class="text-center">
						<button class="btn btn-info btn-sm mr-1" onclick={() => abrirVisualizar(produto)}
							>Visualizar</button
						>
						<button class="btn btn-secondary btn-sm mr-1" onclick={() => abrirEditar(produto)}
							>Editar</button
						>
						<button class="btn btn-error btn-sm" onclick={() => removerProduto(produto.id)}
							>Remover</button
						>
					</td>
				</tr>
			{/if}
		</tbody>
	</table>
	{#if produtoVisualizar}
		<div class="modal modal-open">
			<div class="modal-box">
				<h3 class="mb-4 text-lg font-bold">Detalhes do Produto</h3>
				<p><strong>Nome:</strong> {produtoVisualizar.nome}</p>
				<p><strong>Categoria:</strong> {produtoVisualizar.categoria}</p>
				<p><strong>Estoque:</strong> {produtoVisualizar.quantidadeEstoque}</p>
				<p><strong>Preço de Venda:</strong> R$ {produtoVisualizar.precoVenda.toFixed(2)}</p>
				<p><strong>Descrição:</strong> {produtoVisualizar.descricao}</p>
				<button class="btn btn-primary mt-4" click={fecharVisualizar}>Fechar</button>
			</div>
		</div>
	{/if}

	{#if produtoEditar}
		<div class="modal modal-open">
			<div class="modal-box">
				<h3 class="mb-4 text-lg font-bold">Editar Produto</h3>
				<div class="mb-2">
					<label>Nome</label>
					<input type="text" bind:value={produtoEditar.nome} class="input input-bordered w-full" />
				</div>
				<div class="mb-2">
					<label>Categoria</label>
					<input
						type="text"
						bind:value={produtoEditar.categoria}
						class="input input-bordered w-full"
					/>
				</div>
				<div class="mb-2">
					<label>Quantidade Estoque</label>
					<input
						type="number"
						min="0"
						bind:value={produtoEditar.quantidadeEstoque}
						class="input input-bordered w-full"
					/>
				</div>
				<div class="mb-2">
					<label>Preço Venda</label>
					<input
						type="number"
						step="0.01"
						bind:value={produtoEditar.precoVenda}
						class="input input-bordered w-full"
					/>
				</div>
				<div class="mb-2">
					<label>Descrição</label>
					<textarea bind:value={produtoEditar.descricao} class="textarea textarea-bordered w-full"
					></textarea>
				</div>
				<div class="mt-4 flex justify-end gap-2">
					<button class="btn btn-secondary" onclick={fecharEditar}>Cancelar</button>
					<button class="btn btn-primary" onclick={salvarEdicao}>Salvar</button>
				</div>
			</div>
		</div>
	{/if}
</div>
