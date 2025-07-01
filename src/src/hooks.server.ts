import { redirect, type Handle } from '@sveltejs/kit';
import { generateSessionToken, validateSessionToken } from '$lib/server/lucia';
import { deleteSessionTokenCookie, setSessionTokenCookie } from '$lib/server/session';

const allowRoutes = [
  "/login",
  "/signup",
]

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get("session") ?? null;
	if (token === null) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await validateSessionToken(token);
	if (session !== null) {
		setSessionTokenCookie(event, token, session.expiresAt);
	} else {
		deleteSessionTokenCookie(event);
	}

	event.locals.session = session;
	event.locals.user = user;
	return resolve(event);
};