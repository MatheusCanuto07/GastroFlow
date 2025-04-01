<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
  console.log(data);
  
</script>

<div class="w-full px-10 py-5 border-cyan-700 bg-slate-300 rounded-2xl">
  {data}
  <form action="" class="flex items-center">
    <div class="w-1/2">
      <input type="text" class="input w-full self-end" placeholder="Digite o nome de uma receita" />
    </div>
    <div class="w-1/2 pl-2">
      <input class="btn btn-square" type="reset" value="×"/>
      <input class="btn" type="checkbox" name="frameworks" aria-label="Svelte"/>
      <input class="btn" type="checkbox" name="frameworks" aria-label="Vue"/>
      <input class="btn" type="checkbox" name="frameworks" aria-label="React"/>
    </div>
  </form>
</div>

<div>
  <h1>Linguiça</h1>
	<div class="card w-48 bg-base-100 shadow-sm">
		<figure>
			<img
				src="/linguicacaseira.png"
				alt="Shoes"
			/>
		</figure>
		<div class="card-body p-3">
			<h2 class="card-title">Linguiça caseira</h2>
			<p>
				Carde de porco, oregano, chimichurri, pele de porco, farinha
			</p>
			<div class="card-actions justify-end">
				<button class="btn btn-primary">Realizar receita</button>
			</div>
		</div>
	</div>
  <div class="divider"></div>
  <h1>Embutidos</h1>
  <div class="divider"></div>
  <h1>Defumados</h1>
  <div class="divider"></div>
  <h1>Patês e Terrines</h1>
</div>
