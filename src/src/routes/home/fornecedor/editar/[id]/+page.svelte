<script lang="ts">
	import FormFornecedor from '$lib/components/Formularios/FormFornecedor.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  let fornecedor = data.fornecedor;
  let insumosList = data.insumos;
</script>

<div class="breadcrumbs text-sm">
  <ul>
    <li><a href="/home">Home</a></li>
    <li><a href="/home/fornecedor">Fornecedor</a></li>
    <li><a href="/home/fornecedor">{fornecedor.name}</a></li>
  </ul>
</div>

<form method="POST" action="?/editarfornecedor">
  <FormFornecedor 
    idUser={1} 
    {fornecedor} 
    insumos={insumosList} 
    viewOnly={false}
    form={null}
    isNew={false}
  />
  <div class="w-full flex justify-end">
    <button class="btn btn-success">Enviar</button>
  </div>
</form>
