import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({locals}) => {
  // Pesquisar o que o locals significa
  // Toda a aplicação consegue ver essas informações
  const session = locals.session
  const user = locals.user
	return {
		session,
		user
	};
};