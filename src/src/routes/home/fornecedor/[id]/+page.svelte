<script lang="ts">
	import FormFornecedor from '$lib/components/Formularios/FormFornecedor.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  let fornecedor = data.fornecedor;
  let insumos = data.insumos;
</script>

<div class="breadcrumbs text-sm">
  <ul>
    <li><a href="/home">Home</a></li>
    <li><a href="/home/fornecedor">Fornecedor</a></li>
    <li><a href="/home/fornecedor">{fornecedor.name}</a></li>
  </ul>
</div>

<FormFornecedor 
  isNew={false}
  idUser={1} 
  {fornecedor} 
  {insumos} 
  viewOnly={true}
  form={null}
/>

