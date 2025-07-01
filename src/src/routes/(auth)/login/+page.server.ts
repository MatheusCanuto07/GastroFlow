import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

import { Argon2id } from 'oslo/password';
import { createSession, generateSessionToken } from '$lib/server/lucia';
import { userQueries } from '$lib/server/controller/user';
import { setSessionTokenCookie } from '$lib/server/session';


export const actions: Actions = {
  default: async (event) => {
    const { request, locals } = event;
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');

    
    if (!email || !password) {
      throw redirect(303, '/login?error=Missing+email+or+password');
    }
    
    const [existingUser] = await userQueries.getUserByEmail(email.toString());
    
    if (existingUser == null) {
      throw redirect(303, '/login?error=invalidCredentials');
    }
    
    const validPassword = await new Argon2id().verify(existingUser.password, password.toString());
    
    if (!validPassword) {
      throw redirect(303, '/login?error=invalidCredentials');
    }
    const token = generateSessionToken();
    const session = await createSession(token, existingUser.id);
    setSessionTokenCookie(event, token, session.expiresAt)

    throw redirect(303, `/home/fornecedor`);
  }
} satisfies Actions;