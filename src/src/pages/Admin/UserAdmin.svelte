<script>
  import { onMount } from "svelte";
  import { addNewGroupUser, initGroupUsersDatabase, deleteGroupUser } from "../../datasource";
  import { groupUsers } from "../../appState";
    import LoadingSpinner from "../../components/LoadingSpinner.svelte";

  let newUser = "";
  let isSubmitting = false;

  onMount(async () => {
    await initGroupUsersDatabase();
  });

  const onSubmit = async () => {
    console.log("Submitting", { newUser })
    if (!!newUser && newUser.length > 3) {
      isSubmitting = true;
      try {
        await addNewGroupUser(newUser);
      } catch {
        console.log("Error adding user");
      }
      isSubmitting = false;
    }
  };

  const onDeleteUser = async (user) => {
    console.log("Deleting", { user })
    isSubmitting = true;
    try {
      await deleteGroupUser(user.itemId)
    } catch {
      console.log("Error adding user");
    }
    isSubmitting = false;
  }
</script>

<h1>User Admin</h1>

{#each $groupUsers as user}
  <div class="row">
    <p>{user.item.displayName}</p>
    <button on:click={() => onDeleteUser(user)}>X</button>
  </div>
{/each}

<hr/>

{#if isSubmitting}
  <LoadingSpinner/>
{:else}
  <form on:submit|preventDefault={onSubmit}>
    <input type="text" bind:value={newUser} />
    <button type="submit">Add User</button>
  </form>
{/if}

