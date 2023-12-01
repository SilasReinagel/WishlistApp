<script>
  import { onMount } from "svelte";
  import { currentUser, wishlistItems } from "../appState";
  import { recipientUser } from "../appState";
  import { initWishlistItemsDatabase, updateWishlistItem } from "../datasource";
  import ChristmasButton from "../components/ChristmasButton.svelte";
  import BackButton from "../components/BackButton.svelte";
    import LoadingSpinner from "../components/LoadingSpinner.svelte";
    import { howManyAreYouGiving } from "../wishlistItemUtils";

  let recipientUserId = $recipientUser.itemId;
  let receiptDisplayName = $recipientUser.item.displayName;
  let claimee = { userId: $currentUser.itemId, displayName: $currentUser.item.displayName }

  const getNumToGiveRemaining = (row) => row.item.maxGivers - (row.item.givers?.length ?? 0);
  const areYouGiving = (row) => (row.item?.givers ?? []).find(g => g.userId === claimee.userId);
  const shouldShow = (row) => getNumToGiveRemaining(row) > 0 || areYouGiving(row);

  let wishlist = $wishlistItems
    .filter(i => i.item.userId === recipientUserId && shouldShow(i));
  console.log('Wishlist', { claimee, recipientUserId, wishlist });
  let submittingItems = [];

  const onClaim = async (row) => {
    console.log("Claiming", { row })
    submittingItems = [ ...submittingItems, row ];
    const newGivers = [ ...(row.item.givers ?? []), claimee ];
    try {
      await updateWishlistItem(row.itemId, { ...row.item, givers: newGivers })
    } catch {
      console.log("Error claiming item");
    }
    submittingItems = submittingItems.filter(i => i.itemId !== row.itemId);
  }

  onMount(async () => {
    await initWishlistItemsDatabase();
    wishlistItems.subscribe((items) => {
      wishlist = items
        .filter(i => i.item.userId === recipientUserId && shouldShow(i));
      console.log('Wishlist Update', { claimee, recipientUserId, wishlist });
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
      {#each wishlist as row}
        <ChristmasButton 
          text={row.item.displayName} 
          number={getNumToGiveRemaining(row)}
          url={row.item.url}>
            <div slot="action">
              {#if submittingItems.includes(row)}
                <LoadingSpinner />
              {:else if getNumToGiveRemaining(row) <= 0 && areYouGiving(row)}
                <div class="green-sphere-button center"><div class="move-up-3px">{howManyAreYouGiving(claimee.userId, row)}</div></div>
              {:else if getNumToGiveRemaining(row) <= 0}
                <div class="green-sphere-button center"><div class="move-down-3px">😄</div></div>
              {:else if areYouGiving(row)}
                <button class="red-sphere-button center pointer" on:click={() => onClaim(row)}>
                  <div class="move-up-3px">{howManyAreYouGiving(claimee.userId, row)}</div>
                </button>
              {:else}
                <button class="red-sphere-button center pointer" on:click={() => onClaim(row)}><div class="move-down-3px">🎁</div></button>
              {/if}
            </div>
        </ChristmasButton>
      {/each}
    </div>
  </div>
</div>
