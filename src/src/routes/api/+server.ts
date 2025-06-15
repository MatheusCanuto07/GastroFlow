import { fornecedorQueries } from '$lib/server/controller/fornecedor';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
  const insumos = await fornecedorQueries.getAllFornecedores(1);

  return json(insumos);
}