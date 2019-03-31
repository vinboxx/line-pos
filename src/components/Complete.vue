<template>
  <div class="complete-container">
    <p>Payment Completed</p>
    <img src="../assets/thankyou.png" alt="Thank you">
  </div>
</template>

<script>
export default {
  name: 'Complete'
}
</script>

<style scoped lang="scss">
  .complete-container {
    text-align: center;
    padding: 1em;
    background-color: #e2d9d0;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    font-weight: bold;
    font-size: 1.5em;

    img {
      width: 12em;
    }
  }
</style>
