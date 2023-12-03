<script>
  import { onMount } from "svelte";
  import { groupUsers, recipientUser, wishlistItems } from "../appState";
  import { initGroupUsersDatabase, initWishlistItemsDatabase } from "../datasource";
  import ClickCard from "../components/ClickCard.svelte";
  import BackButton from "../components/BackButton.svelte";
    import { navigateTo } from "../navigator";
    import { howManyStillGivable } from "../wishlistItemUtils";

  let givableUsers = $groupUsers;  
  let availableWishlistItemsByUser = {};

  const onClick = (user) => {
    console.log("Clicked", { user });
    recipientUser.set(user);
    navigateTo(`/gifts`);
  };

  onMount(async () => {
    wishlistItems.subscribe((wi) => {
      availableWishlistItemsByUser = wi.reduce((acc, cur) => {
        const { userId } = cur.item;
        if (!acc[userId]) {
          acc[userId] = [];
        }

        if (howManyStillGivable(cur) <= 0) {
          return acc;
        }

        acc[userId].push(cur);
        return acc;
      }, {});
    });
    
    await initGroupUsersDatabase();
    await initWishlistItemsDatabase();
  });
</script>

<div class="full-width col center">
  <div class="full-width">
    <BackButton />
  </div>
  <h1>Who Do You Want To Give To?</h1>
  <div class="flex-rows center-self">
    {#each givableUsers as user}
      <ClickCard text={user.item.displayName} onClick={() => onClick(user)}>
        <div slot="counter" class="black-sphere-button center">
          <h2 class="move-up-2px">{availableWishlistItemsByUser[user.itemId]?.length ?? 0}</h2>
        </div>
      </ClickCard>
    {/each}
  </div>
</div>
