import { redirect, type Handle } from '@sveltejs/kit';
import { generateSessionToken, validateSessionToken } from '$lib/server/lucia';
import { deleteSessionTokenCookie, setSessionTokenCookie } from '$lib/server/session';

// Verificar se o usuário está autenticado em cada requisição.
// Iniciar ou validar sessões de usuário.
// Configurar informações globais de usuário ou permissões de acesso para toda a aplicação.

//  O handle() hook é uma função especial em SvelteKit que permite interceptar todas as requisições do servidor antes que elas sejam processadas

const allowRoutes = [
  "/login",
  "/signup",
  "/home",
]

// export const handle: Handle = async ({ event, resolve }) => {
//   const token = event.cookies.get("session");
// 	if (!token) {
// 		event.locals.user = null;
// 		event.locals.session = null;

//     if(!allowRoutes.includes(event.url.pathname)){
//       redirect(307, "/login");
//     }

// 		return resolve(event);
// 	}

// 	const { session, user } = await validateSessionToken(token);
// 	if (session !== null) {
// 		setSessionTokenCookie(event, token, session.expiresAt);
// 	} else {
// 		deleteSessionTokenCookie(event);
// 	} 

// 	event.locals.session = session;
// 	event.locals.user = user;
// 	return resolve(event);
// };