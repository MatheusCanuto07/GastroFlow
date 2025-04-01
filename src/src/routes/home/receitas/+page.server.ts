import type { PageServerLoad } from './$types';

export const load = (async () => {
  let testeAtos = "teste";
    return {testeAtos};
}) satisfies PageServerLoad;