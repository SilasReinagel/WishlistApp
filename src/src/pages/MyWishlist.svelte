<script>
  import { onMount } from "svelte";
  import { wishlistItems } from "../appState";
  import { currentUser } from "../appState";
  import { initWishlistItemsDatabase } from "../datasource";
  import ChristmasButton from "../components/ChristmasButton.svelte";
  import AddWishlistItemForm from "../components/WishlistItemForm.svelte";
  import BackButton from "../components/BackButton.svelte";

  let currentUserId = $currentUser.itemId;
  let wishlist = $wishlistItems.filter(i => i.item.userId === currentUserId)
  console.log('Wishlist', { currentUser: $currentUser.item.displayName, currentUserId, wishlist });

  onMount(async () => {
    await initWishlistItemsDatabase();
    wishlistItems.subscribe((items) => {
      wishlist = items.filter(i => i.item.userId === currentUserId);
      console.log('Wishlist', { currentUser: $currentUser.item.displayName, currentUserId, wishlist })
    });
  });
</script>

<div class="full-width col center">
  <div class="full-width">
    <BackButton />
  </div>
  <h1>Your Wishlist</h1>
  <div class="full-width col center">
    {#if wishlist.length <= 0}
      <h3>You have no items on your wishlist</h3>
    {/if}
    <div class="flex-rows">
      {#each wishlist as item}
        <ChristmasButton 
          text={item.item.displayName}
          number={item.item.maxGivers}
          url={item.item.url} />
      {/each}
    </div>
  </div>

  <AddWishlistItemForm/>

</div>
