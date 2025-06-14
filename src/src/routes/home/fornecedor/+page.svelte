<script lang="ts">
	import type { PageData } from './$types';
	import Modal from '$lib/components/Modal.svelte';

	let { data }: { data: PageData } = $props();
  const allFornecedores = data.allfornecedores?.allfornecedores

	import { type InsumoSelect } from '$lib/server/schema/fornecedor';

	let listaInsumoDisponiveis: Array<InsumoSelect> = $state([
		{
			id: 1,
			idFornecedor: 1,
			nome: 'default',
			categoria: '',
			dataValidade: '',
			quantidadeDisponivel: '',
			createdAt: ''
		},
		{
			id: 2,
			idFornecedor: 1,
			nome: 'default',
			categoria: '',
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

		listaInsumoDisponiveis = listaInsumoDisponiveis.filter(
			(insumo) => insumo.id !== insumoSelectionadoId
		);
		insumoSelectionadoId = 'Selecione';
	}
</script>

{#snippet novoFornecedor()}
  
    <div class="flex flex-wrap">
      <div class="w-9/12 pr-3">
        <h1>Nome</h1>
        <input name="nome" type="text" placeholder="Type here" class="input input-bordered w-full" />
      </div>
      <div class="w-3/12">
        <h1>Status</h1>
        <select name="status" class="select select-bordered w-full">
          <option value="ativo" selected>Ativo</option>
          <option value="inativo">Inativo</option>
        </select>
      </div>
      <div class="w-4/12 pr-3">
        <h1>Telefone</h1>
        <input
          name="telefone"
          type="number"
          placeholder="Type here"
          class="input input-bordered w-full"
        />
      </div>
      <div class="w-8/12">
        <h1>E-mail</h1>
        <input
          name="email"
          type="email"
          value="atendimento@extra.br.com"
          placeholder="Type here"
          class="input input-bordered w-full"
        />
      </div>
    </div>

    <div class="mt-3 flex flex-wrap">
      <div class="w-9/12">
        <h1>Insumo</h1>
        <select class="select w-full" bind:value={insumoSelectionadoId}>
          <option value="Selecione" selected>Selecione</option>
          {#each listaInsumoDisponiveis as item}
            <option value={item.id}>{item.nome}</option>
          {/each}
        </select>
      </div>
      <div class="flex w-3/12 flex-col">
        <button onclick={adicionaInsumo} class="btn btn-success mt-auto">Adicionar Insumo</button>
      </div>
      <div class="min-h-40 w-full">
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
                  <input class="input" id="valorInsumo{i.id}" type="number" />
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>

{/snippet}

{#snippet visualizarFornecedor()}
  <form action="">

  </form>
	<div class="flex">
		<table class="table">
			<thead>
				<tr>
					<th></th>
					<th>Nome</th>
					<th>Categoria</th>
					<th>Quantidade em estoque</th>
					<th>Estoque mínimo</th>
				</tr>
			</thead>
			<tbody>
				<!-- {#each array as i, index}
					<tr>
						<th>{index}</th>
						<th>Farinha</th>
						<th>Sei lá</th>
						<th>33</th>
						<th>12</th>
					</tr>
				{/each} -->
			</tbody>
		</table>
	</div>
{/snippet}

<div class="border px-16 py-5">
	<div>
		<div class="flex w-full gap-3">
			<div class="w-8/12">
				<input
					type="text"
					placeholder="Pesquisar um fornecedor"
					class="input input-bordered w-full"
				/>
			</div>
			<div class="w-2/12">
				<select class="select select-bordered w-full">
					<option disabled selected>Status</option>
					<option>Crimson</option>
					<option>Amber</option>
					<option>Velvet</option>
				</select>
			</div>
			<div class="w-2/12">
        <form method="POST" action="?/novoinsumo" onsubmit={event?.preventDefault}>
          <input type="hidden" name="idUser" id="idUser" value={1}>
          <Modal
            modalContent={novoFornecedor}
            textoBotao={'Novo'}
            classeBotao={'btn-success w-full'}
            title="Cadastrar Novo Fornecedor"
          />
        </form>
			</div>
		</div>
	</div>
</div>

<div class="mt-3 h-screen overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
	<table class="table">
		<thead>
			<tr>
				<th></th>
				<th>Nome</th>
				<th>Contato</th>
				<th>Email</th>
				<th>Status</th>
				<th class="text-center">Ações</th>
			</tr>
		</thead>
		<tbody>
      {#each (allFornecedores || [])  as f, index}
        <tr class="cursor-pointer hover:bg-base-300">
          <th>{f.id}</th>
          <td>{f.name}</td>
          <td>{f.contato}</td>
          <td>{f.email}</td>
          <td>{f.status}</td>
          <td class="text-center">
            <details class="dropdown dropdown-end dropdown-bottom">
              <summary class="btn m-1">...</summary>
              <ul class="menu dropdown-content z-50 w-52 rounded-box bg-base-100 p-2 shadow-sm">
                <div>
                  <Modal
                    classeBotao="success w-full"
                    textoBotao="Visualizar"
                    title="Visualizar"
                    tamanhoModal="w-11/12 max-w-5xl"
                    modalContent={visualizarFornecedor}
                  />
                  <input type="hidden" name="idUser" id="idUser" value={f.idUser}>
                </div>
                <form method="POST" action="?/editarfornecedor" onsubmit={event?.preventDefault}>
                  <Modal
                    classeBotao="btn-info w-full mt-2"
                    textoBotao="Editar"
                    title="Editar Fornecedor "
                    tamanhoModal="w-11/12 max-w-5xl"
                    modalContent={visualizarFornecedor}
                  />
                </form>
                <li>
                  <button class="btn btn-success mt-2">Realizar Compra</button>
                </li>
              </ul>
            </details>
          </td>
        </tr>
      {/each}
		</tbody>
	</table>
</div>