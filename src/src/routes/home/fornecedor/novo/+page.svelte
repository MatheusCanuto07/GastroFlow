<script lang="ts">
	import FormFornecedor from "$lib/components/Formularios/FormFornecedor.svelte";

</script>

<div class="breadcrumbs text-sm">
  <ul>
    <li><a href="/home">Home</a></li>
    <li><a href="/home/fornecedor">Fornecedor</a></li>
    <li>Novo</li>
  </ul>
</div>

<form method="POST" action="?/novofornecedor">
  <FormFornecedor 
    idUser={1} 
    viewOnly={false}
    form={null}
    insumos={null}
    fornecedor={null}
    isNew={true}
  />
  <div class="w-full flex justify-end mt-2">
    <button class="btn btn-success">Enviar</button>
  </div>
</form>