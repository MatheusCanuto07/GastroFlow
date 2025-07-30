<script>
	let {itensBreadcrumps} = $props();
</script>

<div class="w-full bg-base-100/50 backdrop-blur-sm sticky top-0 z-10 border-b border-base-200">
  <div class="container mx-auto px-4 py-3">
    <div class="breadcrumbs text-sm">
      <ul class="flex items-center space-x-2">
        <li>
          <a href="/home" class="flex items-center gap-2 px-3 py-1 rounded-lg transition-all hover:bg-primary/10 hover:text-primary-focus text-base-content/80">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span class="font-medium">Home</span>
          </a>
        </li>
        {@render itensBreadcrumps?.()}
      </ul>
    </div>
  </div>
</div>
