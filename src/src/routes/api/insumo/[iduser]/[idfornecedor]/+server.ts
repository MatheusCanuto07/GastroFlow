import {insumoQueries} from '$lib/server/controller/insumo';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
  console.log(params)
  const insumos = await insumoQueries.getAllInsumoFromFornecedor(
    parseInt(params.iduser), parseInt(params.idfornecedor)
  );
  return json(insumos);
}