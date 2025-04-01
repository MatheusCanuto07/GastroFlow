import type { PageServerLoad } from '../../$types';
import {validateSessionToken} from '$lib/db/queries';

export const load = (async () => {
  // TODO: Implementar cookies
  const token = cookies.get("session");
  if (token !== null) {
    const { session, user } = await validateSessionToken(token);
  }
  return {};
}) satisfies PageServerLoad;