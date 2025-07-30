<script lang="ts">
	import  FormProduto  from '$lib/components/Formularios/FormProduto.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  let produto = data.produto;
</script>

<div class="breadcrumbs text-sm">
  <ul>
    <li><a href="/home">Home</a></li>
    <li><a href="/home/produto">Produto</a></li>
    <li><a href="/home/produto">{produto.nome}</a></li>
  </ul>
</div>

<form method="POST" action="?/editarfornecedor">
  <FormProduto
    {produto}
  />
  <div class="w-full flex justify-end">
    <button class="btn btn-success">Enviar</button>
  </div>
</form>
