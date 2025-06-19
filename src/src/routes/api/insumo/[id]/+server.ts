import { fornecedorQueries } from '$lib/server/controller/fornecedor';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
  // const insumos = await fornecedorQueries.getAllFornecedores(parseInt(params.id));
  console.log(params.id)
  let insumos = {
    allfornecedores: [
      {
        id: 1,
        name: 'Insumo 1',
        telefone: '123456789',
        contato: '123456789',
        email: '4Bq5B@example.com',
      }
    ]
  }
  return json(insumos);
}