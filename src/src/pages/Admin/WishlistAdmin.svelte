<script>
  import { onMount } from "svelte";
  import { initWishlistItemsDatabase, deleteWishlistItem } from "../../datasource";
  import { wishlistItems } from "../../appState";

  onMount(async () => {
    await initWishlistItemsDatabase();
  });

  const onDeleteWishlistItem = async (item) => {
    console.log("Deleting", { item })
    try {
      await deleteWishlistItem(item.itemId)
    } catch {
      console.log("Error adding user");
    }
  }
</script>

<h1>Wishlist Admin</h1>

{#each $wishlistItems as i}
  <div class="row">
    <p>{i.item.displayName}</p>
    <button on:click={() => onDeleteWishlistItem(i)}>X</button>
  </div>
{/each}
