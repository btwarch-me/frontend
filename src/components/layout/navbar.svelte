<script lang="ts">
	import { LogIn, Plus } from '@lucide/svelte';

	import { page } from '$app/state';
	import { isMemeFormOpen } from '$lib/stores';

	const pathname = $derived(page.url.pathname);

	const addMeme = () => {
		isMemeFormOpen.set(true);
	};
</script>

<nav class="sticky top-0 z-50 flex w-full p-4">
	<div
		class="container mx-auto flex justify-between rounded-full bg-foreground/5 p-2 px-3 backdrop-blur-3xl"
	>
		<div class="flex items-center justify-center">
			<a href="/" class="text-lg font-bold">BTW<span class="text-blue-500">ARCH</span></a>
		</div>
		<div class="flex items-center justify-center gap-4">
			{#if pathname === '/memes'}
				<button
					onclick={addMeme}
					class="cursor-pointer text-sm font-medium text-gray-500 transition-all duration-300 ease-out hover:text-foreground"
				>
					<Plus class="size-4" />
				</button>
			{/if}
			<a
				href="/memes"
				class="text-sm font-medium text-gray-500 transition-all duration-300 ease-out hover:text-foreground"
			>
				Memes
			</a>
			<a
				href="/signup"
				class="flex items-center gap-2 rounded-full bg-amber-50/10 px-2 py-1 text-sm font-medium text-gray-500 transition-all duration-300 ease-out hover:bg-amber-50/20 hover:text-foreground"
			>
				<LogIn class="size-4" />
				Signup
			</a>
		</div>
	</div>
</nav>
