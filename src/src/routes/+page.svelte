<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { draggable, droppable, type DragDropState } from '@thisux/sveltednd';

  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
  
</script>

<h1>Landing page</h1>
<a class="btn btn-success" href="/home">Começar a usar</a>