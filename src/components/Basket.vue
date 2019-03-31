<template>
  <div class="basket-container">
    <div class="basket-container-inner">
      <div v-if="store.state.lineItems.length === 0" style="text-align: center">No selected books</div>
      <div v-else>
        <v-receipt />
      </div>
    </div>
  </div>
</template>

<script>
import store from '../stores/basketStore'
import Receipt from './Receipt'

export default {
  name: 'Basket',
  components: {
    'v-receipt': Receipt
  },
  data () {
    return {
      store: store
    }
  }
}
</script>

<style scoped lang="scss">
  .basket-container {
    text-align: left;
    display: flex;
    height: 100%;
  }

  .basket-container-inner {
    padding: 1em;
    width: 100%;
    background-color: #e2d9d0;
    overflow-y: scroll;
  }

</style>
