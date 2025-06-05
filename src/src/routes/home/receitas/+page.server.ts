// +page.server.ts
import { fail, redirect } from "@sveltejs/kit";

import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	if (event.locals.user === null) {
		return redirect(303 ,"/login");
	}
	// ...
};

export const actions: Actions = {
	default: async (event) => {
		if (event.locals.user === null) {
			throw fail(401);
		}
		// ...
	}
};