<script lang="ts">
	import { draggable } from "@thisux/sveltednd";
  import type {Product} from "$lib/schema/transacoes";

  let {title, description, titleServe, price, img, id} : Product = $props();  
</script>

<div 
class="rounded-md w-32 bg-slate-200 shadow-lg">
  <img class="rounded-t-md" src={img || 'hamburger.png'} alt="Hamburguer">
  <div class="p-3">
    <h1 class="text-2xl">{title}</h1>
    <p>{description}</p>
    <p>{titleServe}</p>
    <p>{price}</p>
  </div>
</div>