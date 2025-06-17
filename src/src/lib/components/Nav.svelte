<script lang="ts">
	import { page } from '$app/stores';

</script>

<div class="navbar mb-3 bg-base-100 shadow-sm lg:px-40 xl:px-60" style="background-color: #f1c42d;">
	<div class="flex-1">
    <div class="w-24">
      <a href="/home" class="">
        <img class="h-auto" src="/logo.jpeg" alt="Logo Gastro Flow">
      </a>
    </div>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal items-center px-1">
      <li><a href="/home/insumo" class={$page.url.pathname.split('/').pop() == "insumo" ? "ativo" : ""}>Insumo</a></li>
      <li><a href="/home/produto" class={$page.url.pathname.split('/').pop() == "produto" ? "ativo" : ""}>Produto</a></li>
      <li><a href="/home/receita" class={$page.url.pathname.split('/').pop() == "receita" ? "ativo" : ""}>Ficha Técnica</a></li>
      <li><a href="/home/fornecedor" class={$page.url.pathname.split('/').pop() == "fornecedor" ? "ativo" : ""}>Fornecedor</a></li>
    </ul>
	</div>
</div>

<style scoped>
  .ativo {
    background-color: #000000  ;
    color: #fff; 
    font-weight: bold; 
  }
</style>