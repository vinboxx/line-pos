<template>
  <div class="basket-container">
    <section v-if="errored">
      <p>We're sorry, we're not able to retrieve receipt information at the moment, please try back later</p>
    </section>

    <section v-else class="basket-container-inner">
      <div v-if="store.state.lineItems.length === 0" style="text-align: center">No selected books</div>
      <div v-else>
        <ul class="item-list">
          <li
              v-for="item in store.state.lineItems"
              v-bind:key="item.id"
              v-bind:item="item">
              <span>{{item.title}}</span>
              <span class="qty">{{item.qty}}</span>
              <span class="price">{{item.price * item.qty}}</span>
              <span class="remove" v-on:click="store.removeItemAction(item)">&times;</span>
          </li>
        </ul>
        <div class="discount" v-if="store.state.discount">
          <span>Discount:</span>
          <span>{{store.state.discount.toFixed(2)}}</span>
        </div>
        <div class="total">
          <span>Total:</span>
          <span>{{store.state.total.toFixed(2)}}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import store from '../stores/basketStore'

export default {
  name: 'Basket',
  data () {
    return {
      store: store,
      loading: false,
      errored: false
    }
  }
}
</script>

<style scoped lang="scss">
  .basket-container {
    text-align: left;
  }

  .basket-container-inner {
    padding: 1em;
    width: 100%;
    background-color: #e2d9d0;
  }

  .item-list {
    list-style: none;
    margin: 0 0 1em 0;
    padding: 0;

    > li {
      display: flex;
      padding: 0.25em 2em 0.25em 0;
      position: relative;

      span {
        display: block;
        padding-left: 1em;
        text-align: right;
      }
    }

    > li span:first-child {
      flex-grow: 1;
      padding-left: 0;
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: break-all;
      overflow: hidden;
    }

    .qty {
      min-width: 32px;
    }

    .price {
      min-width: 64px;
    }

    .remove {
      cursor: pointer;
      font-weight: bold;
      visibility: hidden;
      position: absolute;
      right: 0.5em;
      padding-left: 0;
    }

    li:hover .remove {
      visibility: visible;
    }
  }

  .discount,
  .total {
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    padding-right: 2em;
  }
</style>
