<script>
  import { onMount } from "svelte";
  import { wishlistItems } from "../appState";
  import { recipientUser } from "../appState";
  import { initWishlistItemsDatabase } from "../datasource";
  import ChristmasButton from "../components/ChristmasButton.svelte";
  import BackButton from "../components/BackButton.svelte";

  let recipientUserId = $recipientUser.itemId;
  let receiptDisplayName = $recipientUser.item.displayName;
  let wishlist = $wishlistItems
    .filter(i => i.item.userId === recipientUser)
  console.log('Wishlist', { recipientUserId, wishlist });

  onMount(async () => {
    await initWishlistItemsDatabase();
    wishlistItems.subscribe((items) => {
      wishlist = items
        .filter(i => i.item.userId === recipientUserId);
      console.log('Wishlist', { recipientUserId, wishlist });
    });
  });
</script>

<div class="full-width col center">
  <div class="full-width">
    <BackButton />
  </div>
  <h1>{receiptDisplayName}'s Wishlist</h1>
  <div class="full-width col center">
    {#if wishlist.length <= 0}
      <h3>{receiptDisplayName} has no unclaimed items on their wishlist</h3>
    {/if}
    <div class="flex-rows">
      {#each wishlist as item}
        <ChristmasButton 
          text={item.item.displayName} 
          number={item.item.maxGivers}
          url={item.item.url}
          onClick={() => {}}/>
      {/each}
    </div>
  </div>
</div>
