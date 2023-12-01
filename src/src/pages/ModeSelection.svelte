<script>
  import ClickCard from "../components/ClickCard.svelte";
    import { navigateTo } from "../navigator";
</script>

<div class="full-width col center">
  <h1>What do you want to do?</h1>
  <div class="flex-rows center-self">
    <ClickCard text="Manage Wishlist" onClick={() => navigateTo("/wishlist")}/>
    <ClickCard text="Give A Gift" onClick={() => navigateTo("/give")}/>
    <ClickCard text="Manage My Giving" onClick={() => navigateTo("/giving")}/>
  </div>
</div>
