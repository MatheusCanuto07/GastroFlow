import { dev } from '$app/environment';

import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import {eq} from "drizzle-orm";

import { db } from './db';
import { userTable, sessionTable, type Session , type SessionInsert, type User } from './schema/user';
import { sha256 } from '@oslojs/crypto/sha2';

// Lucia cuida da sessão e da autenticação do usuário
// Cria o adaptador do banco de dados
//const dbAdapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

// Configura o lucia
// Da para fazer sem utilizar biblioteca, aqui está gerando o número da sessão
export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
}
// O ID da sessão será o hash SHA-256 do token. Definiremos a expiração para 30 dias.
export async function createSession(token: string, userId: number): Promise<SessionInsert> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  
	const session: SessionInsert = {
		id: sessionId,
		userId,
    //  Seção expira em 1 mês
    expiresAt: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
	};
	await db.insert(sessionTable).values(session);
	return session;
}
// As sessões são validadas em 2 etapas:

// A sessão existe no seu banco de dados?
// Ainda está dentro do prazo de validade?
// Também estenderemos a expiração da sessão quando ela estiver próxima da expiração. Isso garante que as sessões ativas sejam persistidas, enquanto as inativas eventualmente expirarão. Lidaremos com isso verificando se há menos de 15 dias (metade da expiração de 30 dias) antes da expiração.

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const result = await db
		.select({ user: userTable, session: sessionTable })
		.from(sessionTable)
		.innerJoin(userTable, eq(sessionTable.userId, userTable.id))
		.where(eq(sessionTable.id, sessionId));
            
	if (result.length < 1) {
		return { session: null, user: null };
	}
  
	const { user, session } = result[0];
  const now = Date.now();
	if (now >= session.expiresAt) {
		await db.delete(sessionTable).where(eq(sessionTable.id, session.id));
		return { session: null, user: null };
	}

  const RENEWAL_THRESHOLD = 7 * 24 * 60 * 60 * 1000; // 7 dias em ms
	if (RENEWAL_THRESHOLD >= session.expiresAt) {
		session.expiresAt = Math.floor(Date.now() + 1000 * 60 * 60 * 24 * 30);
		await db
			.update(sessionTable)
			.set({
				expiresAt: session.expiresAt
			})
			.where(eq(sessionTable.id, session.id));
	}
	return { session, user };

}

// Invalida a sessão simplesmente removendo ela do banco
export async function invalidateSession(sessionId: string): Promise<void> {
	await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
}

// Esse tipo é útil para simplificar o retorno de uma função de validação de sessão, proporcionando dois estados possíveis, que podem ser interpretados de forma clara no código:

export type SessionValidationResult =
	| { session: Session; user: User }
	| { session: null; user: null };

//Para funcionar bem com typescript
// declare module 'lucia' {
// 	interface Register {
// 		Lucia: typeof lucia;
// 		DatabaseUserAttributes: {
// 			name: string;
// 			email: string;
// 		};
// 	}
// }

// Passo a passo para a criação de um sistema de autenticação com lucia
// Cria as tabelas com as colunas necessárias > cria o authUtils (arquivo com as funções de criar e apagar sessão)
// Cria o hooks.server para verificar se o usuário está logado e renovar a sua sessão
// Se ele tiver uma sessão criada, os dados do usuário são acessíveis em toda a aplicação