<script lang="ts">
	/* para saber em qual rota estamos e ativar o link atual */
	import { page } from '$app/stores';

	let menuOpen = false;
	$: current = $page.url.pathname;
</script>

<header>
	<nav id="navbar">
		<div class="logo-container">
			<i class="fa-solid fa-thermometer" id="nav_logo"></i>
			<span class="logo-text">gastro flow</span>
		</div>

		<!-- menu desktop -->
		<ul id="nav_list" class="nav-links hidden-mobile">
			<li class:active={current === '/home/insumo'}><a href="/home/insumo">Insumo</a></li>
			<li class:active={current === '/home/produto'}><a href="/home/produto">Produto</a></li>
			<li class:active={current === '/home/fichatecnica'}><a href="/home/fichatecnica">Ficha&nbsp;Técnica</a></li>
			<li class:active={current === '/home/fornecedor'}><a href="/home/fornecedor">Fornecedor</a></li>
		</ul>

		<!-- botão hamburguer -->
		<button id="mobile_btn" class="hidden-desktop" on:click={() => (menuOpen = !menuOpen)}>
			<i class={`fa-solid ${menuOpen ? 'fa-x' : 'fa-bars'}`}></i>
		</button>
	</nav>

	<!-- menu mobile -->
	<div id="mobile_menu" class:active={menuOpen}>
		<ul id="mobile_nav_list">
			<li><a on:click={() => (menuOpen = false)} href="/home">Home</a></li>
			<li><a on:click={() => (menuOpen = false)} href="/home/insumo">Insumo</a></li>
			<li><a on:click={() => (menuOpen = false)} href="/home/produto">Produto</a></li>
			<li><a on:click={() => (menuOpen = false)} href="/home/fichatecnica">Ficha&nbsp;Técnica</a></li>
			<li><a on:click={() => (menuOpen = false)} href="/home/fornecedor">Fornecedor</a></li>
		</ul>
	</div>
</header>

<!-- conteúdo das rotas -->
<div class="xl:px-60 lg:px-40 bg-white min-h-screen">
	<slot />
</div>

<style>
	/* ---------- bloco estrutural ---------- */
	#navbar {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20px 8%;
		background: var(--color-primary-1);
		position: sticky;
		top: 0;
		z-index: 10;
	}
	.logo-container { display: flex; align-items: center; gap: 8px; }
	#nav_logo      { font-size: 28px; color: var(--color-primary-6); }
	.logo-text     { font-size: 2rem; font-weight: 500; color: var(--color-primary-6); font-family: 'Poppins', sans-serif; text-transform: uppercase; }

	/* ---------- links desktop ---------- */
	.nav-links        { display: flex; gap: 32px; list-style: none; margin: 0; padding: 0; }
	.nav-links li a   { font-weight: 500; text-decoration: none; color: #222; padding-bottom: 4px; border-bottom: 3px solid transparent; transition: color .2s, border-bottom .2s; }
	.nav-links li.active a,
	.nav-links li a:hover { color: var(--color-primary-6); }
	.nav-links li.active a { border-bottom-color: var(--color-primary-6); }

	/* ---------- menu mobile ---------- */
	#mobile_menu        { display: none; flex-direction: column; align-items: center; background: var(--color-primary-1); padding: 10px 0; }
	#mobile_menu.active { display: flex; }
	#mobile_nav_list    { display: flex; flex-direction: column; gap: 12px; list-style: none; margin: 0; padding: 0; }
	#mobile_nav_list a  { text-decoration: none; color: var(--color-neutral-1); font-weight: 600; }

	/* ---------- utilidades p/ esconder ---------- */
	.hidden-desktop { display: block;  }
	.hidden-mobile  { display: flex;   }

	@media (min-width: 1171px) {
		.hidden-desktop { display: none; }
		#mobile_menu    { display: none !important; } /* garante que não aparece */
	}

	@media (max-width: 1170px) {
		.hidden-mobile { display: none; }
	}
</style>
