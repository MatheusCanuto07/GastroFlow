<script lang="ts">
  import '../app.css';
  let { children } = $props();
</script>

<div class="drawer">
  <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content flex flex-col">
    <!-- Navbar -->
    <div class="navbar bg-nav w-full">
      <div class="flex-none lg:hidden">
        <label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block h-6 w-6 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div class="mx-2 flex-1 px-2">Gastro Flow</div>
      <div class="hidden flex-none lg:block">
        <ul class="menu menu-horizontal">
          <li><a href="/home/dashboard">Dashboard</a></li>
          <li><a href="/home/insumo">Insumo</a></li>
          <li><a href="/home/produto">Produto</a></li>
          <li><a href="/home/fichatecnica">Ficha Técnica</a></li>
          <li><a href="/home/fornecedor">Fornecedor</a></li>
          <li><a href="/configuracoes">Configurações</a></li>
        </ul>
      </div>
    </div>
    <div class="">
      {@render children()}
    </div>
  </div>
  <div class="drawer-side">
    <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
    <ul class="menu bg-nav min-h-full w-80 p-4">
      <!-- Sidebar content here -->
      <li><a href="/home/dashboard">Dashboard</a></li>
      <li><a href="/home/insumo">Insumo</a></li>
      <li><a href="/home/produto">Produto</a></li>
      <li><a href="/home/fichatecnica">Ficha Técnica</a></li>
      <li><a href="/home/fornecedor">Fornecedor</a></li>
      <li><a href="/configuracoes">Configurações</a></li>
    </ul>
  </div>
</div>

<style>
  .bg-nav {
    background-color: #FFF9EA;
  }
</style>