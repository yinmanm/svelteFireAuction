<script>
	import Header from '$lib/Header.svelte';
	import './styles.css';

  import { onMount } from 'svelte';
  import { auth } from '$lib/firebase';
  import { userStore } from 'sveltefire';
  const user = userStore(auth);

  onMount(() => {
    if(window.location.pathname == '/login') {
      return
    }else {
      // if (user) {
      //   console.log('user',user)
      // } else {
      //   console.log('not login')
      //   window.location = '/login';
      // }
    }
	});
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

<!-- 	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer> -->
</div>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
