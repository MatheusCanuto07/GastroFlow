<script lang="ts">
  let modal : HTMLDialogElement | undefined  = $state();
  let { modalContent, textoBotao, classeBotao, title, tamanhoModal = "" } = $props();

</script>

<!-- svelte-ignore a11y_invalid_attribute -->
<a href="" class="btn {classeBotao}" onclick={() => modal?.showModal()}>{textoBotao}</a>

<dialog bind:this={modal} class="modal">
  <div class="modal-box {tamanhoModal}">
    <h3 class="text-lg font-bold">
      {title}
    </h3>
    <p class="py-4">Press ESC key or click the button below to close</p>

    {@render modalContent()}

    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>