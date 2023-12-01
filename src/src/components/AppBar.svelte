<script>
  import { currentUser } from "../appState";
  import { isLoggedIn } from "../appState";
  import { currentGroupDisplayName } from "../appState";
  import { navigateTo } from "../navigator";
</script>

<style>
  .appbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-image: linear-gradient(rgba(12, 12, 12, 255), rgba(12, 12, 12, 0));
    color: #fff;
    width: 100vw; /* Use 100% instead of 100vw to avoid overflow caused by vertical scrollbar */
    overflow: hidden;;
    height: 72px;
    padding: 0 20px;
    box-sizing: border-box; /* Include padding in the width calculation */
  }

  .appbar h2 {
    white-space: nowrap; /* Prevents text from wrapping and expanding beyond the maximum width */
    overflow: hidden; /* Hides text that overflows */
    text-overflow: ellipsis; /* Adds an ellipsis to text that overflows */
  }

  .appbar .group-name,
  .appbar .user-info {
    flex-shrink: 1; /* Allow these elements to shrink if necessary */
    max-width: calc(50% - 20px); /* Adjust max-width to account for padding */
    display: flex;
    align-items: center; /* Center items vertically */
    margin-right: 10px;
    margin-left: 10px;
  }

  .appbar .light {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: red;
    margin-left: 10px; /* Add some spacing between the text and light */
  }

  .appbar .light.connected {
    background-color: green;
  }
</style>

<div class="appbar">
  <div class="group-name pointer" on:click|preventDefault={() => navigateTo('/')} role="button" tabindex={-1}>
    <h2>{$currentGroupDisplayName}</h2>
  </div>
  <div class="user-info row">
    <h2>{!!$currentUser ? $currentUser.item.displayName : 'User Not Selected'}</h2>
    <div class="light {$isLoggedIn ? 'connected' : ''}"></div>
  </div>
</div>
