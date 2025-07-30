<script lang="ts">
	import type { InsumoSelect } from "$lib/server/schema/insumo";

  interface Props {
		insumo: InsumoSelect | null;
    idUser : number;
    viewOnly : boolean
    isNew : boolean
	}
  
  let { insumo, idUser, viewOnly = false, isNew = false }: Props = $props();
  
  let quantidadeEstoque = $state(insumo?.quantidadeEstoque);

</script>

<div class="flex flex-wrap p-6 bg-base-100 rounded-box shadow-md">
    <div class="w-full md:w-6/12 pr-0 md:pr-3 mb-4">
        <label class="label" for="nome">
            <span class="label-text text-base font-medium">Nome</span>
        </label>
        <input
            name="nome"
            type="text"
            placeholder="Digite o nome do insumo"
            class="input input-bordered w-full focus:input-primary"
            required
            value={insumo?.name}
        />
    </div>

    <div class="w-full md:w-6/12 mb-4">
        <label class="label" for="categoria">
            <span class="label-text text-base font-medium">Categoria</span>
        </label>
        <input
            name="categoria"
            placeholder="Categoria"
            type="text"
            class="input input-bordered w-full focus:input-primary"
            required
            value={insumo?.categoria}
        />
    </div>

    <div class="w-full md:w-6/12 pr-0 md:pr-3 mb-4">
        <label class="label" for="dataValidade">
            <span class="label-text text-base font-medium">Data de Validade</span>
        </label>
        <input
            name="dataValidade"
            type="date"
            class="input input-bordered w-full focus:input-primary"
            placeholder="Validade"
            required
            value={insumo?.dataValidade}
        />
    </div>

    <div class="w-full md:w-3/12 pr-0 md:pr-3 mb-4">
        <label class="label" for="quantidade">
            <span class="label-text text-base font-medium">Quantidade</span>
        </label>
        <input
        name="quantidade"
        id="quantidade"
          type="number"
          min="0"
          step="1"
          class="input input-bordered w-full focus:input-primary"
          placeholder="Apenas números inteiros positivos"
          bind:value={quantidadeEstoque}
        />
    </div>

    <div class="w-full md:w-3/12 mb-4">
        <label class="label" for="custo">
            <span class="label-text text-base font-medium">Custo (R$)</span>
        </label>
        <div class="relative">
            <span class="absolute left-3 top-3 text-gray-500">R$</span>
            <input
                name="custo"
                type="number"
                class="input input-bordered w-full pl-8 focus:input-primary"
                min="0"
                step="0.01"
                placeholder="0.00"
                required
                value={insumo?.custo}
            />
        </div>
    </div>
    <div class="w-full flex justify-end mt-2"> 
    <button class="btn btn-success">
      Enviar
    </button>  
  </div>
</div>