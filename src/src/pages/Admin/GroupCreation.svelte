<script>
  import { initDefaultGroupId } from "../../datasource";

  let result = "";

  const initGroup = () => {
    initDefaultGroupId().then(g => {
      result = "Succeeded";      
    });
  };
</script>

<button on:click={initGroup}>Init Group</button>
<p>{result}</p>