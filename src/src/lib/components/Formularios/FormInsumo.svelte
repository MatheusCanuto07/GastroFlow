<div class="flex flex-wrap">
    <div class="w-6/12 pr-3">
      <h1>Nome</h1>
      {#if form?.errors?.name}
        <p class="text-red-500 bg-red-100 border border-red-400 p-2 rounded mb-4">Digite um nome válido</p>
      {/if}
      <input
        name="nome"
        type="text"
        placeholder="Digite o nome do insumo"
        class="input input-bordered w-full"
        required
      />
    </div>

    <div class="w-6/12">
      <h1>Categoria</h1>
      {#if form?.errors.categoria}
        <p class="text-red-500 rounded mb-1">Digite uma categoria válida</p>
      {/if}
      <input
        name="categoria"
        placeholder="Categoria"
        type="text"
        class="input input-bordered w-full"
        required
      />
      </div>

    <div class="w-6/12 pr-3">
      <h1>Data de Validade</h1>
      {#if form?.errors.dataValidade}
        <p class="text-red-500 rounded mb-1">Digite uma data válida</p>
      {/if}
      <input
        name="dataValidade"
        type="date"
        class="input input-bordered w-full"
        placeholder="Validade"
        required
      />
    </div>

    <div class="w-4/12 pr-3">
      <h1>Quantidade</h1>
      {#if form?.errors.quantidadeEstoque}
        <p class="text-red-500 rounded mb-1">Digite uma quantidade válida</p>
      {/if}
      <input
        name="quantidadeEstoque"
        type="number"
        class="input input-bordered w-full"
        min="0"
        placeholder="Quantidade"
        required
      />
    </div>

    <div class="w-4/12">
      <h1>Custo (R$)</h1>
      {#if form?.errors.custo}
        <p class="text-red-500 rounded mb-1">Digite um custo válido</p>
      {/if}
      <input
        name="custo"
        type="number"
        class="input input-bordered w-full"
        min="0"
        step="0.01"
        placeholder="Custo"
        required
      />
    </div>
  </div>