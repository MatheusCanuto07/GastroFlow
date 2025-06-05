<script lang="ts">
  // let total = $props();

  interface Props {
    total : string
    tipo : string
	}

  const { total, tipo }: Props = $props();

</script>

<div class="flex justify-center border border-gray-200 items-center shadow-xl h-14 w-1/2 rounded-lg">
  <p class={tipo == 'entrada' ? 'text-green-500 font-semibold' : 'text-red-500'}>
    {tipo.substr(0, 1).toUpperCase() + tipo.substr(1)+ 's'} 
    R$ {total}
  </p>
</div>