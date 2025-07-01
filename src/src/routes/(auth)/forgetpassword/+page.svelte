<script lang="ts">
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
</script>

<header>
  <nav id="navbar">
    <div class="logo-container">
      <i class="fa-solid fa-thermometer" id="nav_logo"></i>
      <span class="logo-text">gastro flow</span>
    </div>
  </nav>
</header>

<div class="flex items-center justify-center min-h-screen #fff9ea50">
  <div class="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-900">Recuperar Senha</h1>
      <p class="mt-2 text-sm text-gray-600">
        Digite seu e-mail para receber uma senha temporária
      </p>
    </div>
    
    <form class="mt-8 space-y-6">
      <div class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            E-mail cadastrado
          </label>
          <input 
            id="email" 
            name="email" 
            type="email" 
            autocomplete="email" 
            required 
            placeholder="seu@email.com" 
            class="input input-bordered w-full mt-1"
          />
        </div>
      </div>

      <div>
        <button type="submit" class="btn btn-primary w-full">
          Receber senha temporária
        </button>
      </div>
    </form>
    
    <div class="text-center mt-4">
      <p class="text-sm text-gray-600">
        Lembrou sua senha?
        <a href="/login" class="font-medium text-blue-600 hover:text-blue-800">
          Fazer login
        </a>
      </p>
      <p class="text-sm text-gray-600 mt-2">
        Não tem uma conta?
        <a href="/cadastro" class="font-medium text-blue-600 hover:text-blue-800">
          Criar conta
        </a>
      </p>
    </div>
  </div>
</div>