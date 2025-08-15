<script>
	import { fuckwin } from '$lib';
</script>

<div class="flex min-h-[70vh] flex-col items-center justify-center">
	<div
		class="container mx-auto flex flex-col-reverse items-center gap-6 px-4 text-center md:flex-row"
	>
		<div class="items-left flex w-full flex-col gap-4 md:w-1/2">
			<h1 class="text-left text-4xl font-bold tracking-tight text-foreground md:text-6xl">
				BTW WE USE <span class="text-blue-500">ARCH</span>
			</h1>
			<p class="max-w-2xl text-left text-lg text-gray-400 md:text-xl">
				Join the Arch Linux community where we absolutely despise Windows and everything it stands
				for. Because proprietary software is for losers.
			</p>
			<div class="flex flex-col gap-4 sm:flex-row">
				<a
					href="/"
					class="rounded-full bg-blue-500 px-6 py-2 text-center font-medium text-black transition-all hover:bg-blue-400"
					>Join Us</a
				>
				<a
					href="/"
					class="rounded-full border border-blue-500/20 px-6 py-2 text-center font-medium text-blue-500 transition-all hover:bg-blue-500/10"
					>Why Windows Sucks?</a
				>
			</div>
		</div>
		<img src={fuckwin} alt="Fuck Windows" class="w-full rounded-lg md:w-1/2" />
	</div>
</div>
