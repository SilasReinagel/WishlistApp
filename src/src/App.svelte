<script>
  import Router from './Router.svelte';
  import LoadingPage from './pages/Structural/LoadingPage.svelte';
  import { isLoaded } from './appState';
  import AppBar from './components/AppBar.svelte';
</script>

{#if isLoaded}
  <main>
    <AppBar />
    <Router />
  </main>
{:else}
  <main>
    <LoadingPage />
  </main>
{/if}

<style>
</style>
