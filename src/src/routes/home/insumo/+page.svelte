<script lang="ts">

  import type { PageData } from './$types';
  import Modal from '$lib/components/Modal.svelte';

  let { data }: { data: PageData } = $props();

  // Estado do formulário
  let nome = $state('');
  let categoria = $state('');
  let dataValidade = $state('');
  let quantDisponivel = $state('');
  let estoqueMinimo = $state('');
  let custo = $state('');

  // Estado de edição
  let editando = $state(false);
  let idEditando: number | null = $state(null);

  let listaInsumoSelecionado: Array<InsumoSelect> = $state([]);

  // Lista de insumos (mock ou carregado do servidor)
  let listaInsumos = $state<Array<any>>([
    {
      id: 1,
      nome: 'Farinha',
      categoria: 'Cereal',
      dataValidade: '2025-12-01',
      quantDisponivel: 100,
      estoqueMinimo: 20,
      custo: 12.5
    },
    {
      id: 2,
      nome: 'Sal',
      categoria: 'Temperos',
      dataValidade: '2026-01-10',
      quantDisponivel: 50,
      estoqueMinimo: 10,
      custo: 4.3
    }
  ]);

  function resetForm() {
    nome = '';
    categoria = '';
    dataValidade = '';
    quantDisponivel = '';
    estoqueMinimo = '';
    custo = '';
    editando = false;
    idEditando = null;
  }

  function enviarFormulario() {
    event?.preventDefault();

    const novoInsumo = {
      id: editando && idEditando ? idEditando : Date.now(),
      nome,
      categoria,
      dataValidade,
      quantDisponivel: Number(quantDisponivel),
      estoqueMinimo: Number(estoqueMinimo),
      custo: parseFloat(String(custo))
    };

    if (editando && idEditando !== null) {
      // Atualiza insumo
      listaInsumos = listaInsumos.map(i => i.id === idEditando ? novoInsumo : i);
    } else {
      // Adiciona novo
      listaInsumos = [...listaInsumos, novoInsumo];
    }

    resetForm();
  }

  function editarInsumo(insumo: any) {
    nome = insumo.nome;
    categoria = insumo.categoria;
    dataValidade = insumo.dataValidade;
    quantDisponivel = insumo.quantDisponivel;
    estoqueMinimo = insumo.estoqueMinimo;
    custo = insumo.custo;

    idEditando = insumo.id;
    editando = true;
  }

  function excluirInsumo(id: number) {
    if (confirm('Deseja realmente excluir este insumo?')) {
      listaInsumos = listaInsumos.filter(i => i.id !== id);
      if (id === idEditando) resetForm();
    }
  }
</script>

{#snippet novoInsumo()}
  <form id="formInsumo" on:submit|preventDefault={enviarFormulario}>
    <div class="flex flex-wrap gap-4">
      <div class="w-6/12">
        <h1>Nome</h1>
        <input
          name="nome"
          type="text"
          placeholder="Digite o nome do insumo"
          class="input input-bordered w-full"
          required
          bind:value={nome}
        />
      </div>
      <div class="w-6/12">
        <h1>Categoria</h1>
        <input
          name="categoria"
          type="text"
          placeholder="Categoria"
          class="input input-bordered w-full"
          bind:value={categoria}
        />
      </div>
      <div class="w-4/12">
        <h1>Data de Validade</h1>
        <input
          name="dataValidade"
          type="date"
          class="input input-bordered w-full"
        />
      </div>
      <div class="w-4/12">
        <h1>Quantidade Disponível</h1>
        <input
          name="quantDisponivel"
          type="number"
          min="0"
          placeholder="Quantidade"
          class="input input-bordered w-full"
        />
      </div>
      <div class="w-4/12">
        <h1>Estoque Mínimo</h1>
        <input
          name="estoqueMinimo"
          type="number"
          min="0"
          placeholder="Estoque mínimo"
          class="input input-bordered w-full"
        />
      </div>
      <div class="w-4/12">
        <h1>Custo</h1>
        <input
          name="custo"
          type="number"
          min="0"
          step="0.01"
          placeholder="Custo"
          class="input input-bordered w-full"
        />
      </div>
    </div>

    <div class="mt-6">
      <button type="submit" class="btn btn-primary w-full">Salvar Insumo</button>
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
									on:click={() => removeInsumo(i.id)}
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


<div class="border px-16 py-5">
	<div>
		<div class="flex w-full gap-3">
			<div class="w-8/12">
				<input
					type="text"
					placeholder="Pesquisar um produto"
					class="input input-bordered w-full"
				/>
			</div>
			<div class="w-4/12">
				<Modal
          modalContent={novoInsumo}
          textoBotao="Novo Insumo"
          classeBotao="btn-success w-full"
          title="Cadastrar Novo Insumo"
        />
			</div>
		</div>
	</div>
</div>

