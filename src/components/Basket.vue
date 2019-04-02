<template>
  <div class="basket-container">
    <div class="basket-container-inner">
      <div v-if="store.state.lineItems.length === 0" style="text-align: center">
        {{emptyMsg}}
      </div>
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
      store: store,
      emptyMsg: 'Please select book from list'
    }
  }
}
</script>

<style scoped lang="scss">
  .basket-container {
    background-color: #e2d9d0;
  }

  .basket-container-inner {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 1em;
    width: 100%;
  }

</style>
