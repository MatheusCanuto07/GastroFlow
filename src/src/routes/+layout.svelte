<script lang="ts">
	import Card from '$lib/components/Card.svelte';
  import Nav from '$lib/components/Nav.svelte';
  import '../app.css';
  let { children } = $props();
</script>

<div class="">
  {@render children()}
</div>
