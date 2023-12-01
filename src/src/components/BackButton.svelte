<script>
  import { navigateTo } from "../navigator";

  const navigateToMode = () => {
    navigateTo("/mode");
  };
</script>

<style>
  .icon-button {
    cursor: pointer;
    background-color: transparent;
    border: none;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .arrow-left {
    border: solid #fff;
    border-width: 0 16px 16px 0;
    display: inline-block;
    padding: 20px;
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
  }

  .container {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    margin-left: 16px;
    transform: scale(0.5);
    position: fixed;
    background-color: transparent;
    border: none;
  }
</style>

<button class="container" on:click={navigateToMode} title="Go back">
  <div class="icon-button">
    <i class="arrow-left"></i>
  </div>
</button>
