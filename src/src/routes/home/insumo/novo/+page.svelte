<script lang="ts">
	import FormInsumo from "$lib/components/Formularios/FormInsumo.svelte";
  import Breadcrump from "$lib/components/Breadcrump.svelte";

</script>

{#snippet bred()}
  <li><a href="/home/insumo">Insumo</a></li>
  <li>Novo</li>
{/snippet}

<Breadcrump itensBreadcrumps={bred}/>
  
<form method="POST" action="?/novoinsumo" class="">
  <FormInsumo 
    insumo={null}
    idUser={1} 
    viewOnly={false}
    isNew={true}
  />
</form>
