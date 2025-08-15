<script lang="ts">
	const tabs = [
		{
			label: 'Features',
			href: '/'
		},
		{
			label: 'GitHub',
			href: 'https://github.com/btwarch-me'
		},
		{
			label: 'Discord',
			href: 'https://discord.gg/p53RZzgeHA'
		}
	];

	let activePage = $state<string>('/');

	$effect(() => {
		activePage = tabs.find((tab) => tab.href === window.location.pathname)?.href || '/';
	});
</script>

<nav class="flex w-full p-4">
	<div class="container mx-auto flex justify-between p-0">
		<div class="flex items-center justify-center">
			<p class="text-lg font-bold">BTWARCH</p>
		</div>
		<div class="flex items-center justify-center gap-2">
			{#each tabs as tab}
				<a
					href={tab.href}
					class="rounded-full bg-amber-50/10 px-2 py-0.5 text-sm font-medium text-gray-500 hover:bg-amber-50/20 hover:text-foreground {activePage ===
					tab.href
						? 'text-amber-500'
						: ''} transition-all duration-300 ease-out"
				>
					{tab.label}
				</a>
			{/each}
		</div>
	</div>
</nav>
