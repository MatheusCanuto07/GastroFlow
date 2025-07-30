<script lang="ts">
	import { authClient } from '../../../auth-client';

  let email = 'matheuscanuto07@gmail.com';
  let password = '7198214@';
  let name = 'Matheus Canuto';

	async function signUp() {
		const { data, error } = await authClient.signUp.email(
			{
				email,
				password, // user password -> min 8 characters by default
				name,
				// image,
				callbackURL: '/home/dashboard'
			},
			{
				onRequest: (ctx) => {
					//show loading
				},
				onSuccess: (ctx) => {
					console.log('ctx', ctx);
				},
				onError: (ctx) => {
					// display the error message
					console.log(ctx.error.message);
				}
			}
		);
	}
</script>

<header>
	<nav id="navbar">
		<div class="logo-container">
			<i class="fa-solid fa-thermometer" id="nav_logo"></i>
			<span class="logo-text">gastro flow</span>
		</div>
	</nav>
</header>

<div class="#fff9ea50 flex min-h-screen items-center justify-center">
	<div class="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
		<div class="text-center">
			<h1 class="text-3xl font-bold text-gray-900">Se inscreva!</h1>
		</div>

		<form class="mt-8 space-y-6" onsubmit={signUp}>
			<div class="space-y-4">
				<div>
					<label for="username" class="block text-sm font-medium text-gray-700">
						Nome de usuário
					</label>
					<input
						id="username"
						name="username"
						type="text"
						class="input input-bordered mt-1 w-full"
						bind:value={name}
					/>
				</div>
			</div>
			<div class="space-y-4">
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700"> Email </label>
					<input
						id="email"
						name="email"
						type="email"
						autocomplete="email"
						required
						class="input input-bordered mt-1 w-full"
            bind:value={email}
					/>
				</div>

				<div>
					<div class="flex items-center justify-between">
						<label for="password" class="block text-sm font-medium text-gray-700"> Senha </label>
					</div>
					<input
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						required
						bind:value={password}
						class="input input-bordered mt-1 w-full"
					/>
				</div>
			</div>

			<div>
				<button type="submit" class="btn btn-primary w-full"> Se inscrever </button>
			</div>
		</form>

		<div class="mt-4 text-center">
			<p class="text-sm text-gray-600">
				Já tem uma conta ?
				<a href="/login" class="font-medium text-blue-600 hover:text-blue-800"> Fazer login </a>
			</p>
		</div>
	</div>
</div>
