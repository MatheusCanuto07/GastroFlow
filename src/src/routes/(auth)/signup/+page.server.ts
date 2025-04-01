import type { PageServerLoad } from '../../$types';
import { generateSessionToken, createSession } from "$lib/db/queries";

export const load = (async () => {
  // TODO: get user id

  const token = generateSessionToken();
  const session = createSession(token, userId);
  setSessionTokenCookie(token);
  
  return {};
}) satisfies PageServerLoad;