<script>
  import { onMount } from "svelte";
  import { wishlistItems } from "../appState";
  import { currentUser } from "../appState";
  import { deleteWishlistItem, initWishlistItemsDatabase } from "../datasource";
  import ChristmasButton from "../components/ChristmasButton.svelte";
  import AddWishlistItemForm from "../components/WishlistItemForm.svelte";
  import BackButton from "../components/BackButton.svelte";
    import ConfirmModal from "../components/ConfirmModal.svelte";

  let currentUserId = $currentUser.itemId;
  let wishlist = $wishlistItems.filter(i => i.item.userId === currentUserId)
  let confirmModalAction = undefined;
  let selectedItem = undefined;
  console.log('Wishlist', { currentUser: $currentUser.item.displayName, currentUserId, wishlist });

  const onDeleteClick = (item) => {
    selectedItem = item;
    confirmModalAction = () => deleteWishlistItem(item.itemId)
      .then(() => {
        confirmModalAction = undefined
        selectedItem = undefined;
      })
      .catch(e => {
        confirmModalAction = undefined
        selectedItem = undefined;
        console.log("Error deleting wishlist item", e);
      });
  }

  onMount(async () => {
    await initWishlistItemsDatabase();
    wishlistItems.subscribe((items) => {
      wishlist = items.filter(i => i.item.userId === currentUserId);
      console.log('Wishlist', { currentUser: $currentUser.item.displayName, currentUserId, wishlist })
    });
  });
</script>

<div class="full-width col center">
  <ConfirmModal 
    onConfirm={confirmModalAction} 
    showModal={!!confirmModalAction}
    title="Remove Wishlist Item"
    description={`Are you sure you want to remove ${selectedItem?.item?.displayName ?? ""} from your wishlist?`}
  />
  <div class="full-width">
    <BackButton />
  </div>
  <h1>Your Wishlist</h1>
  <div class="full-width col center">
    {#if wishlist.length <= 0}
      <h3>You have no items on your wishlist</h3>
    {/if}
    <div class="flex-rows">
      {#each wishlist as row}
        <ChristmasButton 
          text={row.item.displayName}
          number={row.item.maxGivers}
          url={row.item.url}
        >
          <button slot="action" class="red-sphere-button center pointer" on:click={() => onDeleteClick(row)}>
            <div>X</div>
          </button>
        </ChristmasButton>
      {/each}
    </div>
  </div>

  <AddWishlistItemForm/>

</div>
