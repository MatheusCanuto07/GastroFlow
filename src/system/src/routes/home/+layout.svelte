<script lang="ts">
	import Nav from '$lib/components/nav.svelte';


  
  let { children } = $props();
</script>

<Nav/>

{@render children?.()}
