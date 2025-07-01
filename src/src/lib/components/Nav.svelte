<script lang="ts">
	import { page } from '$app/stores';
  import { onMount } from 'svelte';

  onMount(() => {
    const mobileBtn = document.getElementById('mobile_btn');
    const mobileMenu = document.getElementById('mobile_menu');

    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (icon) icon.classList.toggle('fa-x');
      });
    }
  });
</script>

<header>
  <nav id="navbar">
    <div class="logo-container">
      <i class="fa-solid fa-thermometer" id="nav_logo"></i>
      <span class="logo-text">gastro flow</span>
    </div>

    <!-- Menu Desktop -->
    <ul id="nav_list" class="nav-links">
      <li class={$page.url.pathname === '/home' ? 'active' : ''}>
        <a href="/home">Home</a>
      </li>
      <li class={$page.url.pathname === '/home/insumo' ? 'active' : ''}>
        <a href="/home/insumo">Insumo</a>
      </li>
      <li class={$page.url.pathname === '/home/produto' ? 'active' : ''}>
        <a href="/home/produto">Produto</a>
      </li>
      <li class={$page.url.pathname === '/home/receita' ? 'active' : ''}>
        <a href="/home/receita">Ficha Técnica</a>
      </li>
      <li class={$page.url.pathname === '/home/fornecedor' ? 'active' : ''}>
        <a href="/home/fornecedor">Fornecedor</a>
      </li>
    </ul>

    <!-- Botão do menu mobile -->
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button id="mobile_btn">
      <i class="fa-solid fa-bars"></i>
    </button>
  </nav>

  <!-- Menu Mobile -->
  <div id="mobile_menu">
    <ul id="mobile_nav_list">
      <li><a href="/home">Home</a></li>
      <li><a href="/home/insumo">Insumo</a></li>
      <li><a href="/home/produto">Produto</a></li>
      <li><a href="/home/fichatecnica">Ficha Técnica</a></li>
      <li><a href="/home/fornecedor">Fornecedor</a></li>
    </ul>
  </div>
</header>

<style>
  #navbar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 8%;
    background-color: var(--color-primary-1);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .logo-container {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  #nav_logo {
    font-size: 28px;
    color: var(--color-primary-6);
  }

  .logo-text {
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--color-primary-6);
    font-family: 'Poppins', sans-serif;
    text-transform: uppercase;
  }

  .nav-links {
    display: flex;
    gap: 32px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-links li a {
    font-weight: 500;
    text-decoration: none;
    color: #222;
    padding-bottom: 4px;
    transition: color 0.2s, border-bottom 0.2s;
    border-bottom: 3px solid transparent;
  }

  .nav-links li.active a {
    color: var(--color-primary-6);
    border-bottom: 3px solid var(--color-primary-6);
  }

  .nav-links a:hover {
    color: var(--color-primary-6);
  }

  #mobile_btn {
    display: none;
    border: none;
    background-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
  }

  #mobile_menu {
    display: none;
    flex-direction: column;
    align-items: center;
    background-color: var(--color-primary-1);
    padding: 10px 0;
  }

  #mobile_menu.active {
    display: flex;
  }

  #mobile_nav_list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  #mobile_nav_list a {
    text-decoration: none;
    color: var(--color-neutral-1);
    font-weight: 600;
  }

  @media screen and (max-width: 1170px) {
    .nav-links {
      display: none;
    }

    #mobile_btn {
      display: block;
    }
  }
</style>
