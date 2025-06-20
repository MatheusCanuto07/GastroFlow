<script lang="ts">
	import type { Component } from "svelte";

  let modal : HTMLDialogElement | undefined  = $state();

  interface Props {
    Componente : Component
    textoBotao : string, 
    classeBotao : string, 
    title : string, 
    tamanhoModal : string, 
    textBtn : string, 
    classBtnEnviar : string,
    readOnly : boolean
	}

  const 
  { 
    Componente, 
    textoBotao, 
    classeBotao, 
    title, 
    tamanhoModal = "", 
    textBtn = "Enviar", 
    classBtnEnviar = "success", 
    readOnly = false
  }: Props = $props();
</script>

<!-- svelte-ignore a11y_invalid_attribute -->
<a href="" class="btn {classeBotao}" onclick={() => modal?.showModal()}>{textoBotao}</a>

<dialog bind:this={modal} class="modal">
  <div class="modal-box {tamanhoModal}">
    <h3 class="text-lg font-bold">
      {title}
    </h3>
    <Componente />
    <div class="modal-action">
      <form method="dialog" onsubmit={event?.preventDefault}>
        <button class="btn">Close</button>
      </form>
      {#if !readOnly}
        <button class="btn btn-{classBtnEnviar}" onclick={() => modal?.close()}>{textBtn}</button>
      {/if}
    </div>
  </div>
</dialog>