<script>
  export let text;
  export let onClick;
</script>

<style>
  .button-container {
      padding: 10px;
      background: #1c1e22;
      border-radius: 30px;
      box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.5);
      text-align: center;
      width: max-content;
      margin: 8px;
  }

  .button {
      display: inline-block;
      padding: 15px 30px;
      background: linear-gradient(145deg, #242629, #131417);
      border-radius: 50px;
      box-shadow: inset 5px 5px 15px #0b0c0d,
                  inset -5px -5px 15px #2e3036;
      color: #ffffff;
      font-size: 18px;
      font-weight: bold;
      user-select: none;
      border: none;
      outline: none;
      cursor: pointer;
      transition: all 0.3s ease;
  }

  .button:active {
      box-shadow: inset 1px 1px 5px #0b0c0d,
                  inset -1px -1px 5px #2e3036;
  }
</style>

<div class="button-container">
  <button class="button" on:click|preventDefault={onClick}>
      {text}
  </button>
</div>
