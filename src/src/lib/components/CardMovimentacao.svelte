<script lang="ts">
	import ModalComponent from "./ModalComponent.svelte";

	interface Props {
    data: string ;
    banco?: string;
    tipo?: string;
    valor?: number;
    categoria?: string;
    recorrencia?: number;
    dataRecorrencia?: number;
    descricao?: string;
    formaPagamento : string
    imgProp? : string
	}

  function timeStampForDate(ts : Date){
      const dia = ts.getUTCDate();
      const mes = ts.getUTCMonth() + 1;
      const ano = ts.getUTCFullYear();
      return `${dia}/${mes}/${ano}`;
    }

  // svelte-ignore non_reactive_update
  let dialog;

  let imgs = [
    {
      nome : "nuBank",
      img : "https://logopng.com.br/logos/nubank-95.png"
    },
    {
      nome: "devedor",
      img : "https://www.blogcessaodecreditos.com.br/wp-content/uploads/2020/02/devedor.jpg"
    },
    {
      nome : 'inter',
      img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh-dT9pyeTrk30OPa-g9FYrD5wLShxvfozgQ&s"
    }
  ]

  
	const { data, banco, tipo, valor, categoria, recorrencia, dataRecorrencia, descricao, formaPagamento, imgProp }: Props = $props();
</script>

<ModalComponent bind:this={dialog}>
  {#snippet children()}
    <h1>Descrição: {descricao}</h1>
  {/snippet}
</ModalComponent>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onclick={dialog.abrirModal} class="flex justify-between w-full rounded-lg px-5 py-2 shadow-xl mb-3 border border-gray-300">
  <div class="flex">
    <div class="w-12 mr-3">
      <img class="rounded-md" src={imgs.find((i) => i.nome == imgProp)?.img} alt="">
    </div>
    <div>
      <h2 class="font-bold">R$ {valor ? valor / 100 : 0}</h2>
      <h1>{formaPagamento?.charAt(0).toUpperCase() + formaPagamento?.slice(1)}</h1>
    </div>
  </div>
  <div>
    <h1>{categoria}</h1>
    <h1>{timeStampForDate(new Date(parseInt(data)))}</h1>
  </div>
</div>

