<script>
  export let showModal = false;
  export let title = "Confirm Action";
  export let description = "Are you sure you want to perform this action?";
  export let onConfirm = () => {};

  const confirmAction = () => {
    showModal = false;
    onConfirm();
  };

  const cancelAction = () => {
    showModal = false;
  };
</script>

<style>
.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  animation: fadeIn 0.3s forwards;
  z-index: 10;
}

.modal-content {
  background: #2c3e50;
  color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  transform: translateY(-20%);
  animation: slideIn 0.3s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  to {
    transform: translateY(0);
  }
}

.modal-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #2980b9;
}

button:active {
  transform: translateY(1px);
}
</style>

{#if showModal}
  <div class="modal">
    <div class="modal-content">
      <h2>{title}</h2>
      <p>{description}</p>
      <div class="modal-buttons">
        <button on:click={confirmAction}>Confirm</button>
        <button on:click={cancelAction}>Cancel</button>
      </div>
    </div>
  </div>
{/if}
