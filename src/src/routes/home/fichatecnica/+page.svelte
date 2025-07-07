<script lang="ts">
	import type { PageData } from './$types';
	import Modal from '$lib/components/Modal.svelte';
	import Breadcrump from '$lib/components/Breadcrump.svelte';

	let { data }: { data: PageData } = $props();
	let receita = data.allReceitas;
  // const idUser = data ?? 1;
  // let nPages = data.nPages;
  console.log(receita);
</script>

{#snippet breadcrumpSnippet()}
  <li>
    <a href="/home/fichatecnica" class="hover:text-secondary-focus font-medium transition-colors">
      Receita
    </a>
  </li>
{/snippet}

<Breadcrump itensBreadcrumps={breadcrumpSnippet} />

<div class="mb-10 mt-3 h-[70vh] overflow-x-auto rounded-box border border-base bg-base-10">
	<table class="table h-auto pb-44" style="border: none !important;">
		<thead>
			<tr>
				<th></th>
				<th>Nome</th>
				<th>Descrição</th>
        <th>Produto que gera</th>
				<th class="text-center">Ações</th>
			</tr>
		</thead>
		<tbody>
			{#each receita as rec}
				<tr class="cursor-pointer hover:bg-base-300 relative">
					<th>{rec.id}</th>
					<td>{rec.nome}</td>
					<td>{rec.descricao}</td>
          <td>{rec.quantProdutoGera}</td>
					<td class="text-center">
						<details class="dropdown dropdown-left z-10">
							<summary class="btn m-1">...</summary>
							<ul
								class="menu dropdown-content z-50 w-52 rounded-box bg-base-100 p-2 shadow-sm"
							>
								<li><a href="/home/fichatecnica/{rec.id}" class="btn btn-info mt-2">Fazer Receita</a></li>
								<!-- <li><a href="/home/fichatecnica/editar/{rec.receitas.id}" class="btn btn-secondary mt-2">Editar</a></li> -->
							</ul>
						</details>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
