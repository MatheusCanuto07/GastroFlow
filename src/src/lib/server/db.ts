// import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import {configDataBase} from "../../../config";
// TODO: Olhar esse import
import * as schema from "../server/schema/fornecedor";

// const client = createClient({
//   url: configDataBase.databaseUrl || "",
//   authToken: configDataBase.authToken
// });

// export const db = drizzle(client, {schema: schema});
export type Produto = {
	id: number;
	nome: string;
	categoria: string;
	quantidadeEstoque: number;
	precoCusto: number;
	precoVenda: number;
	descricao?: string;
	insumos: ProdutoInsumo[];
};

export type ProdutoInsumo = {
	idInsumo: number;
	quantidade: number;
};

export type Insumo = {
	id: number;
	nome: string;
	categoria: string;
	precoUnitario: number;
};

export let insumos: Insumo[] = [
	{ id: 1, nome: 'Carne de Porco', categoria: 'Carne', precoUnitario: 5 },
	{ id: 2, nome: 'Sal', categoria: 'Temperos', precoUnitario: 2 }
];

export let produtos: Produto[] = [];

let idProduto = 1;

export function criarProduto(novoProduto: Omit<Produto, 'id'>) {
	const produto: Produto = { ...novoProduto, id: idProduto++ };
	produtos.push(produto);
	return produto;
}
