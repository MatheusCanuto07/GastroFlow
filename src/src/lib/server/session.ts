import type { RequestEvent } from "@sveltejs/kit";

// Lida com os cookies

// Um cookie é um pequeno dado textual armazenado no lado do client, mais especificamente no browser.

// Uma sessão são dados associados a um client armazenados no lado do server. Para tal, pode-se gravar um cookie no client com o identificador desta sessão, ai toda requisição que o client faz ao server, passa esse identificador da sessão, e então o server sabe qual é a sessão que deve usar para aquele usuário.

// Os dados na sessão em teoria estão mais seguros, já que estão no lado do servidor. Os dados de cookies podem facilmente ser apagados pelo próprio usuário do navegador.

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: number): void {
  event.cookies.set("session", token, {
		httpOnly: true,
		sameSite: "lax",
		expires: new Date(expiresAt * 1000),
		path: "/"
	});
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
	event.cookies.set("session", "", {
		httpOnly: true,
		sameSite: "lax",
		maxAge: 0,
		path: "/"
	});
}