import type { Actions } from '@sveltejs/kit';
import { authClient } from '../../../auth-client';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email')?.toString() ?? '';
		const password = formData.get('password')?.toString() ?? '';
		if (email === '' || password === '') return;

		const { data, error } = await authClient.signIn.email(
			{
				email,
				password,
				callbackURL: '/home/dashboard',
				rememberMe: false
			},
			{
				//callbacks
			}
		);
	}
} satisfies Actions;
