<script>
  // Reactive variables
  let email = "matheuscanuto07@gmail.com";
  let password = "7198214";
  let rememberMe = false;

  // Handle form submission
  function handleSubmit() {
    // Handle login logic here
    console.log({ email, password, rememberMe });
  }
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-50">
  <div class="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-900">Welcome back</h1>
      <p class="mt-2 text-sm text-gray-600">
        Sign in to your account
      </p>
    </div>
    
    <form class="mt-8 space-y-6" method="POST">
      <div class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            bind:value={email}
            class="input input-bordered w-full mt-1"
            placeholder="your@email.com"
          />
        </div>
        
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <a href="/forgetpassword" class="text-xs text-blue-600 hover:text-blue-800">
              Forgot password?
            </a>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
            bind:value={password}
            class="input input-bordered w-full mt-1"
          />
        </div>
        
        <div class="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            bind:checked={rememberMe}
            class="checkbox checkbox-sm checkbox-primary"
          />
          <label for="remember-me" class="ml-2 block text-sm text-gray-700">
            Remember me
          </label>
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="btn btn-primary w-full">
          Sign in
        </button>
      </div>
    </form>
    
    <div class="text-center mt-4">
      <p class="text-sm text-gray-600">
        Don't have an account?
        <a href="/signup" class="font-medium text-blue-600 hover:text-blue-800">
          Sign up
        </a>
      </p>
    </div>
  </div>
</div>