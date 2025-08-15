<script>
	import Hero from '$components/hero.svelte';
	import { Check, X, LoaderCircle } from '@lucide/svelte';

	let domain = '';
	let checking = false;
	let available = false;

	async function checkDomain() {
		if (!domain) return;

		checking = true;
		available = false;

		await new Promise((resolve) => setTimeout(resolve, 1000));

		checking = false;
		available = !['arch', 'linux', 'btw'].includes(domain.toLowerCase());
	}

	const someUsers = ['kevin', 'jason', 'hima', 'linus', 'richard'];

	let currentIndex = 0;
	let randomUser = someUsers[0];

	setInterval(() => {
		currentIndex = (currentIndex + 1) % someUsers.length;
		randomUser = someUsers[currentIndex];
	}, 2000);
</script>

<Hero />
<div class="flex min-h-[60vh] flex-col items-center justify-center py-16">
	<div class="container mx-auto px-6">
		<div class="text-center">
			<h2
				class="mb-6 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-3xl font-bold text-transparent md:text-5xl"
			>
				Get Your Free Subdomain
			</h2>
			<p class="mx-auto mb-12 max-w-2xl text-sm leading-relaxed text-gray-300 md:text-lg">
				Show your Arch Linux pride with a free
				<span class="rounded-md bg-blue-500/10 px-2 py-1 font-mono text-blue-400"
					>yourname.btwarch.me</span
				>
				subdomain. Join our community and let everyone know that you use Arch BTW.
			</p>
		</div>

		<div class="mx-auto flex w-full max-w-xl flex-col items-center gap-4 sm:flex-row">
			<div class="relative w-full sm:w-3/4">
				<div
					class="flex items-center justify-between gap-2 rounded-xl border border-blue-500/20 bg-blue-500/5 p-2 transition-all hover:border-blue-500/40"
				>
					<input
						type="text"
						bind:value={domain}
						oninput={checkDomain}
						placeholder={randomUser}
						class="w-full bg-transparent text-lg placeholder:text-gray-500 focus:outline-none"
					/>
					<span class="font-mono text-sm">.btwarch.me</span>
				</div>
			</div>
			<div class="flex h-6 w-6 items-center justify-center">
				{#if checking}
					<LoaderCircle class="animate-spin text-blue-400" />
				{:else if domain}
					{#if available}
						<Check class="text-green-400" />
					{:else}
						<X class="text-red-400" />
					{/if}
				{:else}
					<div class="h-0 w-0"></div>
				{/if}
			</div>

			<button
				disabled={!available || !domain}
				class="w-full cursor-pointer rounded-xl bg-blue-500 px-8 py-3 font-medium text-black transition-all hover:bg-blue-400 disabled:opacity-50 disabled:hover:bg-blue-500 sm:w-1/4"
			>
				Claim
			</button>
		</div>
	</div>
</div>
