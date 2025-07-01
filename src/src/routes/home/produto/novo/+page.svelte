<script lang="ts">
  import FormProduto from '$lib/components/Formularios/FormProduto.svelte';
</script>

<div class="breadcrumbs text-sm">
  <ul>
    <li><a href="/home">Home</a></li>
    <li><a href="/home/fornecedor">Fornecedor</a></li>
    <li>Novo</li>
  </ul>
</div>

<form method="POST" action="?/novoproduto">
  <FormProduto 
    idUser={1} 
    produto={null}
    viewOnly={false}
    isNew={true}
  />
  <div class="w-full flex justify-end mt-2">
    <button class="btn btn-success">Enviar</button>
  </div>
</form>