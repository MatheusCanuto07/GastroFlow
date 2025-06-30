<script lang="ts">
	import FormInsumo from "$lib/components/Formularios/FormInsumo.svelte";


</script>

<div class="breadcrumbs text-sm">
  <ul>
    <li><a href="/home">Home</a></li>
    <li><a href="/home/insumo">Insumo</a></li>
    <li>Novo</li>
  </ul>
</div>

<form method="POST" action="?/novoinsumo">
  <FormInsumo 
    insumo={null}
    idUser={1} 
    viewOnly={false}
    isNew={true}
  />

  <div class="w-full flex justify-end mt-2"> 
    <button class="btn btn-success">
      Enviar
    </button>  
  </div>
</form>
