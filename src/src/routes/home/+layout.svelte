<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import Nav from '$lib/components/Nav.svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<Nav />

<div class="xl:px-60 lg:px-40">
  {@render children()} 
</div>
