<script>
  import { onMount } from "svelte";
  import { initGroupUsersDatabase, initWishlistItemsDatabase, login } from "../../datasource";
  import LoadingSpinner from "../../components/LoadingSpinner.svelte";
  import { isLoaded, isLoggedIn } from "../../appState";

  onMount(async () => {
    await login();
    await initGroupUsersDatabase();
    await initWishlistItemsDatabase();
    isLoggedIn.set(true);
    isLoaded.set(true);
  });

</script>

<div class="full-page">
  <LoadingSpinner/>
</div>

<style>
  .full-page {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>