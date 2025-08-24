<script lang="ts">
	import { X, Trash2 } from '@lucide/svelte';

	import { isMemeFormOpen } from '$lib/stores';

	let title = '';
	let imageFiles: File[] = [];
	let previewUrls: string[] = [];
	let isDragging = false;
	let description = '';

	function handleClose() {
		isMemeFormOpen.set(false);
		resetForm();
	}

	function resetForm() {
		title = '';
		imageFiles = [];
		description = '';
		previewUrls = [];
	}

	function handleImageSelect(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files[0] && imageFiles.length < 5) {
			const file = input.files[0];
			imageFiles = [...imageFiles, file];
			previewUrls = [...previewUrls, URL.createObjectURL(file)];
		}
	}

	function handleDragEnter(event: DragEvent) {
		event.preventDefault();
		isDragging = true;
	}

	function handleDragLeave(event: DragEvent) {
		event.preventDefault();
		isDragging = false;
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		isDragging = false;
		const files = event.dataTransfer?.files;
		if (files && files[0] && imageFiles.length < 5) {
			const file = files[0];
			imageFiles = [...imageFiles, file];
			previewUrls = [...previewUrls, URL.createObjectURL(file)];
		}
	}

	function removeImage(index: number) {
		URL.revokeObjectURL(previewUrls[index]);
		imageFiles = imageFiles.filter((_, i) => i !== index);
		previewUrls = previewUrls.filter((_, i) => i !== index);
	}

	async function handleSubmit() {
		if (imageFiles.length === 0 || !title) return;

		console.log('Uploading meme:', { title, imageFiles, description });

		handleClose();
	}
</script>

{#if $isMemeFormOpen}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
		<div class="w-full max-w-xl rounded-xl bg-background p-6">
			<div class="mb-4 flex items-center justify-between">
				<h2 class="text-xl font-bold">Upload a Meme</h2>
				<button class="rounded-full p-1 text-gray-500 hover:bg-gray-100" onclick={handleClose}>
					<X class="size-5" />
				</button>
			</div>

			<form onsubmit={handleSubmit} class="flex flex-col gap-4">
				<div>
					<label for="title" class="mb-2 block text-sm font-medium">Title</label>
					<input
						type="text"
						id="title"
						bind:value={title}
						class="w-full rounded-lg border border-gray-300/10 p-2 focus:outline-none"
						placeholder="Enter a title for your meme"
						required
					/>
					<label for="description" class="mb-2 block text-sm font-medium">Description</label>
					<textarea
						id="description"
						bind:value={description}
						class="w-full rounded-lg border border-gray-300/10 p-2 focus:outline-none"
						placeholder="Enter a description for your meme"
					></textarea>
				</div>

				<div>
					<label for="image" class="mb-2 block text-sm font-medium">Images (Max 5)</label>
					<div
						role="button"
						tabindex="0"
						aria-label="Upload image dropzone"
						class="relative flex min-h-[200px] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300/10 p-6 transition-colors duration-200 ease-in-out hover:bg-gray-100/5 {imageFiles.length >=
						5
							? 'pointer-events-none opacity-50'
							: ''}"
						ondragenter={handleDragEnter}
						ondragleave={handleDragLeave}
						ondragover={handleDragOver}
						ondrop={handleDrop}
					>
						<input
							type="file"
							id="image"
							accept="image/*"
							onchange={handleImageSelect}
							class="absolute inset-0 cursor-pointer opacity-0"
							required={imageFiles.length === 0}
							disabled={imageFiles.length >= 5}
						/>
						<div class="text-center">
							<p class="mb-2 text-sm text-gray-500">
								<span class="font-semibold">Click to upload</span> or drag and drop
							</p>
							<p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
							<p class="mt-2 text-xs text-gray-500">{imageFiles.length}/5 images uploaded</p>
						</div>
					</div>
				</div>

				{#if previewUrls.length > 0}
					<div class="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3">
						{#each previewUrls as url, i}
							<div class="relative">
								<img src={url} alt="Preview {i + 1}" class="h-32 w-full rounded-lg object-cover" />
								<button
									type="button"
									class="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
									onclick={() => removeImage(i)}
								>
									<Trash2 class="size-4" />
								</button>
							</div>
						{/each}
					</div>
				{/if}

				<div class="mt-4 flex justify-end gap-2">
					<button
						type="button"
						class="rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100/5"
						onclick={handleClose}
					>
						Cancel
					</button>
					<button
						type="submit"
						class="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
					>
						Upload
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
