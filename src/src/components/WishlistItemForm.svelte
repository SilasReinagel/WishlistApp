<script>
  import { addNewWishlistItem } from "../datasource";
  import { currentUser } from "../appState";
  import LoadingSpinner from "./LoadingSpinner.svelte";

  let newItemName = "";
  let newItemUrl = "";
  let newItemMaxCopies = 1;
  let isSubmitting = false;

  let currentUserId = $currentUser.itemId;
  let currentUserDisplayName = $currentUser.item.displayName;

  const onSubmit = async () => {
    if (!!newItemName && newItemName.length > 3) {
      console.log("Adding", { newItemName, newItemUrl, newItemMaxCopies });
      isSubmitting = true;
      try {
        await addNewWishlistItem({ userId: currentUserId, userDisplayName: currentUserDisplayName, displayName: newItemName, url: newItemUrl, maxGivers: newItemMaxCopies });
        newItemName = "";
        newItemUrl = "";
        newItemMaxCopies = 1;
      } catch(e) {
        console.log("Error adding item", { e });
      }
      isSubmitting = false;
    }
  };
</script>

<style>
 form {
    display: flex;
    flex-direction: column;
    background: #2c3e50;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  input, button {
    padding: 10px;
    margin-bottom: 10px; /* Add space between form elements */
    border: 1px solid #34495e;
    background: #34495e;
    color: #ecf0f1;
    border-radius: 5px;
    font-size: 16px;
  }
  input::placeholder {
    color: #95a5a6;
  }
  button {
    background-color: #18bc9c;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  button:hover {
    background-color: #16a085;
  }
  .header {
    font-size: 24px;
    color: #ecf0f1;
    margin-bottom: 20px;
  }
</style>

{#if isSubmitting}
  <LoadingSpinner/>
{:else}
  <form class="col mt-2" on:submit|preventDefault={onSubmit}>
    <div class="header">Add Wishlist Item</div>
    <input type="text" placeholder="Item Name" bind:value={newItemName}/>
    <input type="number" placeholder="Max Copies" bind:value={newItemMaxCopies}/>
    <input type="text" placeholder="URL" bind:value={newItemUrl}/>
    <button type="submit">Add</button>
  </form>
{/if}