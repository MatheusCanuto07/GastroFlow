<script lang="ts">
	import { filters } from "../../routes/dashboard/params.svelte";

  let selectedPeriod = $state('lastWeek');

  filters.update({
    period : "lastWeek"
  })

  let mudaUrl = (() => {
    filters.update({
      period: selectedPeriod
    })
  })

  $inspect(selectedPeriod)

</script>

<select onchange={mudaUrl} class="select select-bordered w-full mt-2 mb-2" bind:value={selectedPeriod}>
  <option selected value="lastWeek">Última semana</option>
  <option value="lastMonth">Último mês</option>
  <option value="personalizadPeriod">Período personalizado</option>
</select>	