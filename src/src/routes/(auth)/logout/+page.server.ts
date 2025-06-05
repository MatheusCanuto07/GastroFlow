import { invalidateSession } from '$lib/server/lucia';
import { redirect } from '@sveltejs/kit';
import type { Actions } from '../../$types';
import { deleteSessionTokenCookie } from '$lib/server/session';

export const actions: Actions = {
  default: async (event) => {
    const {locals} = event;
		if (!locals.session?.id) return;

		await invalidateSession(locals.session.id);

		await deleteSessionTokenCookie(event);

		throw redirect(303, '/login');
	},

};