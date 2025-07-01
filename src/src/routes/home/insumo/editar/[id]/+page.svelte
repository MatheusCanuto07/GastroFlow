<script lang="ts">
	import FormInsumo from '$lib/components/Formularios/FormInsumo.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  let insumo = data.insumo;
</script>

<div class="breadcrumbs text-sm">
  <ul>
    <li><a href="/home">Home</a></li>
    <li><a href="/home/insumo">Insumo</a></li>
    <li><a href="/home/insumo">{insumo.name}</a></li>
  </ul>
</div>

<form method="POST" action="?/editarinsumo">
  <input type="hidden" name="idUser" id="idUser" value={1}>
  <input type="hidden" name="id" id="id" value={insumo.id}>
  <FormInsumo
    idUser={1} 
    {insumo} 
    viewOnly={false}
    isNew={false}
  />
  <div class="w-full flex justify-end">
    <button class="btn btn-success">Enviar</button>
  </div>
</form>