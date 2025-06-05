<script>

</script>

<div class="flex items-center justify-center min-h-screen bg-gray-50">
  <div class="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-900">Sign up</h1>
    </div>
    
    <form class="mt-8 space-y-6" method="POST">
      <div class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">
            Nome de usuário
          </label>
          <input id="username" name="username" type="text" class="input input-bordered w-full mt-1" value="matheuscanuto07"/>
        </div>
      </div>
      <div class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input id="email" name="email" type="email" autocomplete="email" required value="matheuscanuto07@gmail.com" class="input input-bordered w-full mt-1"/>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
          </div>
          <input id="password" name="password" type="password" autocomplete="current-password" required value="7198214" class="input input-bordered w-full mt-1" />
        </div>
      </div>

      <div>
        <button type="submit" class="btn btn-primary w-full">
          Sign in
        </button>
      </div>
    </form>
    
    <div class="text-center mt-4">
      <p class="text-sm text-gray-600">
        Já tem uma conta ?
        <a href="/login" class="font-medium text-blue-600 hover:text-blue-800">
          Fazer login
        </a>
      </p>
    </div>

  </div>
</div>