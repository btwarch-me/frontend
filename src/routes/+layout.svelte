<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.png';
	import Navbar from '$components/layout/navbar.svelte';
	import Footer from '$components/layout/footer.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar />
{@render children?.()}
<Footer />
