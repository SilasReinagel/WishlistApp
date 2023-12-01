<script>
  import { onMount } from 'svelte';
  import { login } from '../datasource';
  import { connStatus, isLoggedIn } from '../appState'; 
  import { testGroup } from '../config';

  const startLogin = async () => {
    connStatus.set({ color: 'Yellow', message: 'Connecting' });
      try {
          await login().then(resp => {
            console.log(resp);
            connStatus.set({ color: 'Green', message: testGroup.displayName });
        });          
      } catch (error) {
        console.log("Login Error", error);
        connStatus.set({ color: 'Red', message: 'Not Connected' });
      }
  };

  onMount(() => {
    if ($isLoggedIn)
      connStatus.set({ color: 'Green', message: testGroup.displayName });
    else
      startLogin();
  });
</script>

<div class="row status-container flex-end">
  <div class={`light ${$connStatus.color === 'Green' ? 'green' : $connStatus.color === 'Yellow' ? 'yellow' : 'red'}`}></div>
  {$connStatus.message}
</div>

<style>
  .green {
      background-color: green;
  }

  .yellow {
      background-color: yellow;
  }

  .red {
      background-color: red;
  }

  .status-container {
    position: fixed;
    top: 0;
    right: 0;
    padding: 10px;
    text-align: right;
    width: 240px;
    padding-right: 12px;
  }

  .flex-end {
    display: flex;
    justify-content: flex-end;
  }

  .light {
    width: 24px;
    height: 24px;
    border-radius: 12px;
    margin: 2px;
  }
</style>
