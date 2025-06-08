<script lang="ts">
  let modal : HTMLDialogElement | undefined  = $state();
  let { modalContent, textoBotao, classeBotao, title, tamanhoModal = "", textBtn = "Enviar" } = $props();

</script>

<!-- svelte-ignore a11y_invalid_attribute -->
<a href="" class="btn {classeBotao}" onclick={() => modal?.showModal()}>{textoBotao}</a>

<dialog bind:this={modal} class="modal">
  <div class="modal-box {tamanhoModal}">
    <h3 class="text-lg font-bold">
      {title}
    </h3>
    {@render modalContent()}
    <div class="modal-action">
      <form method="dialog" onsubmit={event?.preventDefault}>
        <button class="btn">Close</button>
      </form>
      <button class="btn btn-success">{textBtn}</button>
    </div>
  </div>
</dialog>