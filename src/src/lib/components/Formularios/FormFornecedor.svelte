<script lang="ts">
  import {type InsumoSelect} from "$lib/server/schema/index";

  let listaInsumoDisponiveis : Array<InsumoSelect> = $state([
    {
      id: 1,
      idFornecedor: 1,
      nome : "default",
      categoria: "",
      dataValidade: "",
      quantidadeDisponivel: "",
      createdAt: "",
    },
    {
      id: 2,
      idFornecedor: 1,
      nome : "default",
      categoria: "",
      dataValidade: "",
      quantidadeDisponivel: "",
      createdAt: "",
    }
  ]);

  let listaInsumoSelecionado : Array<InsumoSelect> = $state([]);

  let insumoSelectionadoId : number | string = $state("Selecione")

  function adicionaInsumo(){
    event?.preventDefault();
    if(insumoSelectionadoId == "Selecione") return;

    listaInsumoDisponiveis = listaInsumoDisponiveis.filter(insumo => insumo.id !== insumoSelectionadoId);
    insumoSelectionadoId = "Selecione";
  }

</script>


	<div class="flex flex-wrap">
		<div class="w-9/12 pr-3">
			<h1>Nome</h1>
			<input name="nome" type="text" placeholder="Type here" class="input input-bordered w-full" />
		</div>
		<div class="w-3/12">
			<h1>Status</h1>
			<select name="status" class="select select-bordered w-full">
				<option disabled selected>Ativo</option>
				<option>Inativo</option>
			</select>
		</div>
    <div class="w-4/12 pr-3">
			<h1>Telefone</h1>
			<input name="telefone" type="number" placeholder="Type here" class="input input-bordered w-full" />
		</div>
    <div class="w-8/12">
			<h1>E-mail</h1>
			<input name="email" type="email" placeholder="Type here" class="input input-bordered w-full" />
		</div>
	</div>

	<div class="mt-3 flex flex-wrap">
		<div class="w-9/12">
      <h1>Insumo</h1>
      <select class="select w-full" bind:value={insumoSelectionadoId}>
        <option value="Selecione" selected>Selecione</option>
        {#each listaInsumoDisponiveis as item}
          <option value="{item.id}">{item.nome}</option>
        {/each}
      </select>
		</div>
    <div class="w-3/12 flex flex-col">
      <button onclick={adicionaInsumo} class="btn btn-success mt-auto">Adicionar Insumo</button>
    </div>
    <div class="w-full min-h-40">
      <table class="table min-h-10">
        <thead>
          <tr>
            <td>ID</td>
            <td>Nome</td>
            <td>Valor</td>
          </tr>
        </thead>
        <tbody>
          {#each listaInsumoSelecionado as i}
            <tr>
              <td>{i.id}</td>
              <td>{i.nome}</td>
              <td>
                <input class="input" id="valorInsumo{i.id}" type="number">
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>		
	</div>
