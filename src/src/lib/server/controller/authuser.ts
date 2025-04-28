import { db } from "$lib/db/db";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { userTable, sessionTable } from "$lib/db/schema";
import { sha256 } from "@oslojs/crypto/sha2";
import { eq } from "drizzle-orm";

export function generateSessionToken(): string {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
}

export function createSession(token: string, userId: number): Session {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: Session = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
	};
	db. insert(sessionTable).values({id: session.id, userId: session.userId, expiresAt: session.expiresAt});
	return session;
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const row = await db
    .select({
      sessionId: sessionTable.id,
      userId: sessionTable.userId,
      expiresAt: sessionTable.expiresAt,
      userId2: userTable.id  
    })
    .from(sessionTable)
    .innerJoin(userTable, eq(userTable.id, sessionTable.userId))
    .where(eq(sessionTable.id, sessionId))
    .get();
	if (row === undefined) {
		return { session: null, user: null };
	}
	const session: Session = {
		id: row.sessionId,
		userId: row.userId,
    // Define o tempo da sessão, nessa caso ela vai expirar em um mês
		expiresAt: new Date(row.expiresAt.getTime() * 1000)
	};
	const user: User = {
		id: row.userId2
	};
	if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessionTable).where(eq(sessionTable.id, session.id));
		return { session: null, user: null };
	}
	if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
		session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    await db.update(sessionTable)
          .set({expiresAt: new Date(session.expiresAt.getTime() * 1000)})
          .where(eq(sessionTable.id, session.id));
	}
	return { session, user };
}

export function invalidateSession(sessionId: string): void {
	// TODO
}

export async function invalidateAllSessions(userId: number): Promise<void> {
	// TODO
}

export type SessionValidationResult =
	| { session: Session; user: User }
	| { session: null; user: null };

export interface Session {
	id: string;
	userId: number;
	expiresAt: Date;
}

export interface User {
	id: number;
}