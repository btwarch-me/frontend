<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.png';
	import Navbar from '$components/layout/navbar.svelte';
	import Footer from '$components/layout/footer.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta property="og:thumbnail" content="https://btwarch.me/arch.png" />
	<meta property="og:title" content="btwarch.me" />
	<meta property="og:description" content="Embrace the Arch Linux way" />
	<meta property="og:url" content="https://btwarch.me" />
	<meta property="og:type" content="website" />
</svelte:head>

<Navbar />
{@render children?.()}
<Footer />
