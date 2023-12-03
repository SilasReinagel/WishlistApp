<script>
  import { onMount } from "svelte";
  import { currentUser, groupUsers } from "../appState";
  import { initGroupUsersDatabase } from "../datasource";
  import ClickCard from "../components/ClickCard.svelte";
  import { navigateTo } from "../navigator";

  let users = [];

  const onClick = (user) => {
    console.log("Clicked", { user });
    currentUser.set(user);
    navigateTo("/mode");
  };

  onMount(async () => {
    currentUser.set(undefined)
    groupUsers.subscribe((gu) => {
      const sortedUsers = gu.sort((a, b) => a.item.displayName.localeCompare(b.item.displayName));
      users = sortedUsers;
    });

    await initGroupUsersDatabase();
  });
</script>

<div class="full-width col center">
  <h1>Who Are You?</h1>
  <div class="flex-rows center-self">
    {#each users as user}
      <ClickCard text={user.item.displayName} onClick={() => onClick(user)} />
    {/each}
  </div>
</div>
