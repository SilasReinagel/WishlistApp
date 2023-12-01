<script>
  import { onMount } from "svelte";
  import { currentUser, groupUsers, recipientUser } from "../appState";
  import { initGroupUsersDatabase } from "../datasource";
  import ClickCard from "../components/ClickCard.svelte";
  import BackButton from "../components/BackButton.svelte";
    import { navigateTo } from "../navigator";

  let givableUsers = $groupUsers;

  const onClick = (user) => {
    console.log("Clicked", { user });
    recipientUser.set(user);
    navigateTo(`/gifts`);
  };

  onMount(async () => {
    await initGroupUsersDatabase();
  });
</script>

<div class="full-width col center">
  <div class="full-width">
    <BackButton />
  </div>
  <h1>Who Do You Want To Give To?</h1>
  <div class="flex-rows center-self">
    {#each givableUsers as user}
      <ClickCard text={user.item.displayName} onClick={() => onClick(user)}/>
    {/each}
  </div>
</div>
