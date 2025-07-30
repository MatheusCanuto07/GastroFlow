<script lang="ts">
import FormFornecedor from '$lib/components/Formularios/FormProduto.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  let produto = data.produto;
</script>

<div class="breadcrumbs text-sm">
  <ul>
    <li><a href="/home">Home</a></li>
    <li><a href="/home/fornecedor">Produto</a></li>
    <li><a href="/home/fornecedor">{produto.nome}</a></li>
  </ul>
</div>
