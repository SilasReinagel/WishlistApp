<script>
  import BackButton from "../components/BackButton.svelte";
  import { currentUser, wishlistItems } from "../appState";
  import { onMount } from "svelte";
  import { initWishlistItemsDatabase } from "../datasource";
  import { howManyAreYouGiving } from "../wishlistItemUtils";
    import ChristmasButton from "../components/ChristmasButton.svelte";

  let currentUserId = $currentUser.itemId;
  let claimee = { userId: $currentUser.itemId, displayName: $currentUser.item.displayName }
  let givingItems = $wishlistItems.filter(i => (i.item.givers ?? []).find(g => g.userId === currentUserId));

  onMount(async () => {
    await initWishlistItemsDatabase();
    wishlistItems.subscribe((items) => {
      givingItems = items.filter(i => (i.item.givers ?? []).find(g => g.userId === currentUserId));
    });
  });

</script>

<div class="full-width col">
  <BackButton />
  <div class="full-width col center">
    <h1>Giving Page</h1>

    <div class="flex-rows">
      {#if givingItems.length <= 0}
        <h3>You have not yet claimed any gifts to give</h3>
      {/if}
      {#each givingItems as row}
        <div class="col">
          <h2 class="center">{row.item.userDisplayName}</h2>
          <ChristmasButton 
            text={row.item.displayName} 
            number={howManyAreYouGiving(claimee.userId, row)}
            url={row.item.url}>            
        </ChristmasButton>
      </div>
      {/each}
    </div>
  </div>
</div>

