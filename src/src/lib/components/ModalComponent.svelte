<script lang="ts">
	let dialog: HTMLDialogElement | undefined = $state();

	export function abrirModal() {
		dialog?.showModal();
	}

	let { children } = $props();
</script>

<dialog bind:this={dialog} class="modal">
	<div class="modal-box">
		{@render children()}
		<div class="modal-action">
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>
