import { redirect } from '@sveltejs/kit';
import { setSessionTokenCookie } from '$lib/server/session';
import { createSession, generateSessionToken, validateSessionToken } from '$lib/server/lucia';
import { Argon2id } from 'oslo/password';
import { userQueries } from '$lib/server/controller/user.js';
import type { RequestEvent } from './$types.js';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async (event: RequestEvent) => {
		const formData = await event.request.formData();

		const name = formData.get('username') || '';
		const email = formData.get('email') || '';
		const password = formData.get('password') || '';

		const dbUser = await userQueries.getUserByEmail(email.toString());
    
		if (dbUser.length > 0) {
			throw redirect(303, '/login');
		}
    
		const hashedPassword = await new Argon2id().hash(password.toString());

		const [nUser] = await userQueries.insertUser({
			name: name.toString(),
			email: email.toString(),
			password: hashedPassword
		});
    
		if (!nUser)  
			return redirect(302, '/signup');
    
    const token = generateSessionToken();
		await createSession(token, nUser.id);

		throw redirect(302, '/');
	}
};