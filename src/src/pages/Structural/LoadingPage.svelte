<script>
  import { onMount } from "svelte";
  import { initGroupUsersDatabase, initWishlistItemsDatabase } from "../../datasource";
  import LoadingSpinner from "../../components/LoadingSpinner.svelte";
  import { isLoaded } from "../../appState";

  onMount(async () => {
    await initGroupUsersDatabase();
    await initWishlistItemsDatabase();
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