<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';
  import { page } from '$app/stores'; // ✅ Importa o caminho da rota ativa

  let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<!-- ✅ Header com logo e navegação -->
<header>
  <nav id="navbar">
    <!-- Logo à esquerda -->
    <div class="logo-container">
      <i class="fa-solid fa-thermometer" id="nav_logo"></i>
      <span class="logo-text">gastro flow</span>
    </div>

    <!-- Menu à direita -->
    <ul class="nav-links">
		<li class={$page.url.pathname === '/home' ? 'active' : ''}>
        <a href="/home">Home</a>
      </li>
      <li class={$page.url.pathname === '/home/insumo' ? 'active' : ''}>
        <a href="/home/insumo">Insumo</a>
      </li>
      <li class={$page.url.pathname === '/home/produto' ? 'active' : ''}>
        <a href="/home/produto">Produto</a>
      </li>
      <li class={$page.url.pathname === '/home/fichatecnica' ? 'active' : ''}>
        <a href="/home/fichatecnica">Ficha Técnica</a>
      </li>
      <li class={$page.url.pathname === '/home/fornecedor' ? 'active' : ''}>
        <a href="/home/fornecedor">Fornecedor</a>
      </li>
    </ul>
  </nav>
</header>

<!-- ✅ Conteúdo principal -->
<div class="xl:px-60 lg:px-40 bg-white min-h-screen">
  {@render children()}
</div>


