<script lang="ts">
	import Meme from '$components/memepage/meme.svelte';
	import MemeForm from '$components/memepage/memeForm.svelte';
	import { isMemeFormOpen } from '$lib/stores';
</script>

<div class="container mx-auto flex max-w-5xl flex-col gap-4 p-4">
	<h1 class="text-2xl font-bold">Memes</h1>
	<div class="flex flex-col gap-4">
		<Meme
			src="https://i.imgur.com/XyPXr8F.jpg"
			alt="I use arch btw meme"
			title="I use Arch BTW"
			likes={4269}
			comments={142}
		/>
		<Meme
			src="https://i.imgur.com/9DV6cZF.jpg"
			alt="Package manager meme"
			title="pacman go brrr"
			likes={3187}
			comments={98}
		/>
		<Meme
			src="https://i.imgur.com/K8fZmUe.jpg"
			alt="Linux desktop customization meme"
			title="Just a little ricing"
			likes={2954}
			comments={167}
		/>
		<Meme
			src="https://i.imgur.com/L2Bx5h9.jpg"
			alt="Arch installation meme"
			title="First time installing Arch like"
			likes={5823}
			comments={284}
		/>
	</div>
</div>
<MemeForm />
