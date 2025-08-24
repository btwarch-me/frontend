<script lang="ts">
	import { ArrowBigUp, ArrowBigDown, Share2, MessageCircle } from '@lucide/svelte';

	interface Props {
		src: string;
		alt: string;
		title: string;
		likes: number;
		comments: number;
	}

	const { src, alt, title, likes, comments }: Props = $props();
</script>

<div
	class="cursor-pointer overflow-hidden rounded-2xl bg-foreground/5 shadow-lg transition-all duration-300 hover:bg-foreground/10"
>
	<div class="relative">
		<img {src} {alt} class="h-full w-full" loading="lazy" />
		<div class="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-4">
			<h3 class="text-lg font-semibold text-white">{title}</h3>
		</div>
	</div>
	<div class="flex items-center justify-between p-4">
		<div class="flex items-center gap-4">
			<button class="flex cursor-pointer items-center gap-1 text-gray-400 hover:text-blue-500">
				<ArrowBigUp class="size-5" />
				<span class="text-sm">{likes}</span>
			</button>
			<button class="flex cursor-pointer items-center gap-1 text-gray-400 hover:text-red-500">
				<ArrowBigDown class="size-5" />
			</button>
		</div>
		<div class="flex items-center gap-4">
			<button class="flex cursor-pointer items-center gap-1 text-gray-400 hover:text-foreground">
				<MessageCircle class="size-5" />
				<span class="text-sm">{comments}</span>
			</button>
			<button class="flex cursor-pointer items-center gap-1 text-gray-400 hover:text-foreground">
				<Share2 class="size-5" />
			</button>
		</div>
	</div>
</div>
