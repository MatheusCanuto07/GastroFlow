<script lang="ts">
	import type { InsumoSelect } from "$lib/server/schema/insumo";

  interface Props {
		insumo: InsumoSelect | null;
    idUser : number;
    viewOnly : boolean
    isNew : boolean
	}

	let { insumo, idUser, viewOnly = false, isNew = false }: Props = $props();
</script>

<div class="flex flex-wrap">
    <div class="w-6/12 pr-3">
      <h1>Nome</h1>
      <input
        name="nome"
        type="text"
        placeholder="Digite o nome do insumo"
        class="input input-bordered w-full"
        required
        value={insumo?.name}
      />
    </div>

    <div class="w-6/12">
      <h1>Categoria</h1>
      <input
        name="categoria"
        placeholder="Categoria"
        type="text"
        class="input input-bordered w-full"
        required
        value={insumo?.categoria}
      />
    </div>

    <div class="w-6/12 pr-3 mt-2">
      <h1>Data de Validade</h1>
      <input
        name="dataValidade"
        type="date"
        class="input input-bordered w-full"
        placeholder="Validade"
        required
        value={insumo?.dataValidade}
      />
    </div>

    <div class="w-3/12 pr-3 mt-2">
      <h1>Quantidade</h1>
      <input
        name="quantidade"
        type="number"
        class="input input-bordered w-full"
        min="0"
        placeholder="Quantidade"
        required
        value={insumo?.quantidadeEstoque}
      />
    </div>

    <div class="w-3/12 mt-2">
      <h1>Custo (R$)</h1>
      <input
        name="custo"
        type="number"
        class="input input-bordered w-full"
        min="0"
        step="0.01"
        placeholder="Custo"
        required
        value={insumo?.custo}
      />
    </div>
  </div>