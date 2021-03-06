<template>
  <div class="receipt-paper">
    <div v-if="showHeader">
      <img class="header-logo" src="../assets/logo.png" alt="">
      <h2>{{storeName}}</h2>
    </div>
    <div v-if="basketStore.state.lineItems.length === 0" style="text-align: center">
      No selected books
    </div>
    <div v-else>
      <ul class="item-list">
        <li
            v-for="item in basketStore.state.lineItems"
            v-bind:key="item.id"
            v-bind:item="item">
            <span>{{item.title}}</span>
            <span class="qty">&times;{{item.qty}}</span>
            <span class="price">{{(item.price * item.qty).toFixed(2)}}</span>
            <span class="remove" v-on:click="basketStore.removeItemAction(item)">&times;</span>
        </li>
      </ul>
      <div class="summary-line total">
        <span>Total:</span>
        <span>{{(basketStore.state.total + basketStore.state.discount).toFixed(2)}}</span>
      </div>
      <div class="summary-line discount" v-if="basketStore.state.discount">
        <span>Discount:</span>
        <span>{{basketStore.state.discount.toFixed(2)}}</span>
      </div>
      <div class="summary-line total text-bold">
        <span>Total Net:</span>
        <span>{{basketStore.state.total.toFixed(2)}}</span>
      </div>
      <div v-if="showPayment">
        <div class="summary-line paid" v-if="basketStore.state.cashReceived">
          <span>Paid in cash:</span>
          <span>{{basketStore.state.cashReceived.toFixed(2)}}</span>
        </div>
        <div class="summary-line" v-if="basketStore.state.cashReceived">
          <span>Change:</span>
          <span>{{(basketStore.state.cashReceived - basketStore.state.total).toFixed(2)}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import basketStore from '../stores/basketStore'
import bookStore from '../stores/bookStore'

export default {
  name: 'Receipt',
  data () {
    return {
      basketStore: basketStore,
      errored: false,
      loading: false,
      storeName: bookStore.state.storeName
    }
  },
  props: {
    showHeader: Boolean,
    showPayment: Boolean
  }
}
</script>

<style scoped lang="scss">
  .receipt-paper {
    transition: box-shadow .25s;
    padding: 20px;
    margin: auto;
    border-radius: 2px;
    background-color: #fff;
    max-width: 500px;
    min-height: 500px;
    box-shadow: 0 12px 15px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  }

  .header-logo {
    filter: grayscale(100%);
    width: 80px;
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
      min-width: 81px;
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

  .summary-line {
    display: flex;
    justify-content: space-between;
    padding-right: 2em;
  }

  .paid {
    margin-top: 1em;
  }

  .text-bold {
    font-weight: bold;
  }
</style>
