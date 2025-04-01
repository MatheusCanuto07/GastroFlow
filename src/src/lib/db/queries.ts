import { desc, eq, sql, between, and, asc, sum } from 'drizzle-orm';
import { db } from './db';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import { transactionsTable, usuarioTable } from './schema';
import { sessionTable, userTable } from './schema';
import type { User, Session } from "./schema";

type transactionsModel = typeof transactionsTable.$inferInsert;
type transactionsSelect = typeof transactionsTable.$inferSelect;

type usuarioModel = typeof usuarioTable.$inferSelect;
type usuarioSelect = typeof usuarioTable.$inferInsert;

function getLastMonthDate(){
  const dataHoje = new Date();
  const dataUmMesAtras = (new Date(dataHoje.getUTCFullYear(), dataHoje.getUTCMonth() - 1, dataHoje.getUTCDate())).getTime();
  const diaAtual = (new Date().getTime());
  
  return {
    dataHoje,
    dataUmMesAtras,
    diaAtual
  }
}

// A biblioteca db retorna os resultados como um array de objetos
export const queries = () => ({
	listarTransacoes: async () => {
		return db.select().from(transactionsTable);
	},

	enviarTransacaoSimples: async (transacao: transactionsModel) => {
		return db.insert(transactionsTable).values(transacao);
	},

	carregarTransacoesDoUltimoMes: async (tipo: string, idUsuario: number) => {
    let d = getLastMonthDate()

    let q = db!
    .select()
    .from(transactionsTable)
    .where(
      and(
        between(transactionsTable.data, d.dataUmMesAtras.toString(), d.diaAtual.toString()),
        eq(transactionsTable.tipo, tipo),
        eq(transactionsTable.idUsuario, idUsuario)
      ) 
    )
    .orderBy(
      desc(transactionsTable.data)  
    )
		return q
	},

  carregarTotalTransacoesTipoMes: async(tipo: string, idUsuario: number) => {
    let d = getLastMonthDate()

    let q = db!
    .select({
      total : sum(transactionsTable.valor)
    })
    .from(transactionsTable)
    .where(
      and(
        eq(transactionsTable.idUsuario, idUsuario),
        eq(transactionsTable.tipo, tipo),
        between(transactionsTable.data, d.dataUmMesAtras.toString(), d.diaAtual.toString())
      )
    )

    return q
  },

	enviarTransacao: async (transacao: transactionsModel, usuario : usuarioModel) => {
		return db.transaction(async (t) => {
			t.insert(transactionsTable).values(transacao);
			t
      .update(usuarioTable)
      .set({saldo : sql`${usuario.saldo} - ${transacao.valor}`})
      .where(eq(usuarioTable.id, transactionsTable.idUsuario));
		});
	},

  carregarmovimentacao: async (idUsuario : number, tipoT : string) => {
    const result = await db!
    .select()
    .from(transactionsTable)
    .where(and(
      eq(transactionsTable.idUsuario, idUsuario),
      eq(transactionsTable.tipo, tipoT)
    ))

    return result
  },

  carregarSaldoUsuario: async (idUsuario : number) => {
    const result = await db!
    .select()
    .from(usuarioTable)
    .where(eq(usuarioTable.id, idUsuario))
    return result
  },


});

export function generateSessionToken(): string {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
}

export async function createSession(token: string, userId: number): Promise<Session> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: Session = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
	};
	await db.insert(sessionTable).values(session);
	return session;
}

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
	if (Date.now() >= session.expiresAt.getTime()) {
		await db.delete(sessionTable).where(eq(sessionTable.id, session.id));
		return { session: null, user: null };
	}
	if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
		session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
		await db
			.update(sessionTable)
			.set({
				expiresAt: session.expiresAt
			})
			.where(eq(sessionTable.id, session.id));
	}
	return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
	await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
}

export async function invalidateAllSessions(userId: number): Promise<void> {
	await db.delete(sessionTable).where(eq(sessionTable.userId, userId));
}

export type SessionValidationResult =
	| { session: Session; user: User }
	| { session: null; user: null };