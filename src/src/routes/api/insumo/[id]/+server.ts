import { fornecedorQueries } from '$lib/server/controller/fornecedor';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
  const insumos = await fornecedorQueries.getAllFornecedores(parseInt(params.id));
  return json(insumos);
}