<template>
  <div id="app">
    <div class="main-panel">
      <div class="panel left-panel">
        <BookList />
        <div class="receipt-panel" v-bind:class="{ active: basketStore.state.step >= 2 }">
          <Receipt :showHeader="true" :showPayment="true" />
        </div>
      </div>

      <div class="panel right-panel">
        <div class="inner">
          <div class="top-bar">
            <img src="./assets/logo.png" class="shop-logo" :alt="storeName">
            {{storeName}}
          </div>
          <div class="right-panel-content">
            <Basket v-if="basketStore.state.step === 1" />
            <Payment v-if="basketStore.state.step === 2" />
            <Complete v-if="basketStore.state.step === 3" />
          </div>
          <div class="bottom-bar">
            <div>
              <button v-if="basketStore.state.step > 1 && basketStore.state.step < 3"
                v-on:click="basketStore.prevStepAction()">
                Back
              </button>
            </div>
            <div>
              <button v-if="basketStore.state.lineItems.length" v-on:click="basketStore.nextStepAction()">
                {{ basketStore.state.step === 3 ? 'Done' : 'Next'}}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import basketStore from './stores/basketStore'
import bookStore from './stores/bookStore'
import BookList from './components/BookList.vue'
import Receipt from './components/Receipt.vue'
import Basket from './components/Basket.vue'
import Payment from './components/Payment.vue'
import Complete from './components/Complete.vue'

export default {
  name: 'app',
  components: {
    BookList,
    Basket,
    Payment,
    Receipt,
    Complete
  },
  data () {
    return {
      basketStore,
      storeName: bookStore.state.storeName
    }
  }
}
</script>

<style lang="scss">
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html, body {
    overflow: hidden;
    height: 100%;
    position: fixed;
  }

  body {
    margin: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
  }

  .top-bar,
  .bottom-bar {
    background-color: #402d20;
    padding: 1em;
    font-size: 1.5em;
    color: #fff;
    font-weight: bold;
    height: 80px;
  }

  .bottom-bar {
    justify-content: space-between;
    display: flex;
    flex-direction: row;

    button {
      background-color: transparent;
      color: #fff;
      font-size: 1.5rem;
      border: none;
    }
  }

  .shop-logo {
    width: 50px;
    vertical-align: middle;
  }

  .main-panel {
    display: flex;
    flex-direction: row;
    height: 100%;
  }

  .panel {
    width: 50%;
    display: flex;
    flex-direction: row;
  }

  .left-panel {
    background-color: #f2ede6;
    > div {
      display: flex;
      flex-wrap: wrap;
      height: 100%;
      overflow-y: scroll;
    }
  }

  .receipt-panel {
    position: absolute;
    z-index: 1;
    width: 50%;
    padding: 1em;
    background-color: rgba(0, 0, 0, 0);
    top: 0;
    bottom: 0;
    transform: translateX(100%);
    transition: transform 10ms ease, background-color 200ms ease-in;
    overflow-y: scroll;

    > .receipt-paper {
      transform: translateX(100%);
      transition: transform 500ms ease;
      min-height: 90%;
    }

    &.active {
      display: block;
      background-color: rgba(0, 0, 0, 0.5);
      transform: translateX(0);

      > .receipt-paper {
        transform: translateX(0);
      }
    }

  }

  .right-panel {
    border-left: 1px solid #ccc;
    z-index: 2;

    > .inner {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }

  .right-panel-content {
    flex: auto;
    display: flex;
    overflow-y: scroll;

    > div {
      flex: 1;
      overflow-y: scroll;
    }
  }
</style>
