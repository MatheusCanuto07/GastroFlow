<script lang="ts">
  import Modal from '$lib/components/Modal.svelte';

  let termoBusca = '';
  let insumos = [
    { id: 1, nome: 'Insumo 1', categoria: 'Categoria Exemplo', quantidade: 10, custo: 45.0 },
    { id: 2, nome: 'Insumo 2', categoria: 'Categoria Exemplo', quantidade: 10, custo: 45.0 },
    { id: 3, nome: 'Insumo 3', categoria: 'Categoria Exemplo', quantidade: 10, custo: 45.0 }
  ];

  let insumosFiltrados = insumos;

  // Modal
  let showModal = false;

  function abrirModalNovoInsumo() {
    showModal = true;
  }

  function fecharModal() {
    showModal = false;
  }

  // Filtro
  $: insumosFiltrados = insumos.filter(insumo =>
    insumo.nome.toLowerCase().includes(termoBusca.toLowerCase())
  );

  // Formulário novo insumo (mock)
  let nome = '';
  let categoria = '';
  let quantidade = '';
  let custo = '';

  function salvarInsumo() {
    const novo = {
      id: Date.now(),
      nome,
      categoria,
      quantidade: Number(quantidade),
      custo: parseFloat(custo)
    };
    insumos = [...insumos, novo];
    fecharModal();
    resetForm();
  }

  function resetForm() {
    nome = '';
    categoria = '';
    quantidade = '';
    custo = '';
  }

  function excluirInsumo(id: number) {
    if (confirm('Deseja realmente excluir?')) {
      insumos = insumos.filter(i => i.id !== id);
    }
  }
</script>

<!-- 🔍 Barra de Pesquisa e Botão -->
<div class="border px-8 py-5 rounded">
  <div class="flex w-full gap-3 items-center">
    <input
      type="text"
      placeholder="Pesquisar um Insumo"
      class="input input-bordered w-full"
      bind:value={termoBusca}
    />
    <Modal
      modalContent={novoInsumo}
      textoBotao="Novo Insumo"
      classeBotao="btn-success"
      title="Cadastrar Novo Insumo"
    />
  </div>
</div>

<!-- 📋 Tabela de Insumos -->
<div class="mt-6 overflow-x-auto">
  <table class="table w-full border rounded">
    <thead>
      <tr class="bg-base-200 text-base font-bold">
        <th>ID</th>
        <th>Nome</th>
        <th>Categoria</th>
        <th>Quantidade em estoque</th>
        <th>Preço de custo</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      {#each insumosFiltrados as insumo}
        <tr class="hover:bg-base-100">
          <td class="font-semibold">{insumo.id}</td>
          <td>{insumo.nome}</td>
          <td>{insumo.categoria}</td>
          <td>{insumo.quantidade}</td>
          <td>R$ {insumo.custo.toFixed(2).replace('.', ',')}</td>
          <td>
            <div class="dropdown dropdown-end">
              <button class="btn btn-sm btn-neutral">⋯</button>
              <!-- Exemplo de menu suspenso, ative se quiser -->
              <!--
              <ul class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a on:click={() => editarInsumo(insumo)}>Editar</a></li>
                <li><a class="text-red-500" on:click={() => excluirInsumo(insumo.id)}>Excluir</a></li>
              </ul>
              -->
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<!-- 🧾 Novo Insumo (conteúdo do modal) -->
{#snippet novoInsumo()}
  <form on:submit|preventDefault={salvarInsumo}>
    <div class="flex flex-wrap gap-4">
      <div class="w-full">
        <label class="font-semibold">Nome</label>
        <input
          type="text"
          class="input input-bordered w-full"
          bind:value={nome}
          required
        />
      </div>

      <div class="w-full">
        <label class="font-semibold">Categoria</label>
        <input
          type="text"
          class="input input-bordered w-full"
          bind:value={categoria}
          required
        />
      </div>

      <div class="w-6/12">
        <label class="font-semibold">Quantidade</label>
        <input
          type="number"
          class="input input-bordered w-full"
          min="0"
          bind:value={quantidade}
          required
        />
      </div>

      <div class="w-6/12">
        <label class="font-semibold">Preço de custo (R$)</label>
        <input
          type="number"
          class="input input-bordered w-full"
          min="0"
          step="0.01"
          bind:value={custo}
          required
        />
      </div>
    </div>

    <div class="mt-6">
      <button type="submit" class="btn btn-primary w-full">
        Salvar Insumo
      </button>
    </div>
  </form>
{/snippet}
