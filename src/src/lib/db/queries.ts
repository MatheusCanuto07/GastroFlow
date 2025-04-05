import { desc, eq, sql, between, and, asc, sum } from 'drizzle-orm';
import { db } from './db';
import { transactionsTable, usuarioTable } from './schema';

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