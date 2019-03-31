<template>
  <div id="app">
    <div class="main-panel">
      <BookList class="panel left-panel" />

      <div class="panel right-panel">
        <div class="inner">
          <div class="top-bar">
            <img src="./assets/logo.png" class="shop-logo" alt="Little Brown Book Shop">
            Little Brown Book Shop
          </div>
          <div class="right-panel-content">
            <Basket v-if="store.state.step === 1" />
            <Payment v-if="store.state.step === 2" />
          </div>
          <div class="bottom-bar">
            <div>
              <button v-if="store.state.step > 1" v-on:click="store.prevStepAction()">Back</button>
            </div>
            <div>
              <button v-if="store.state.lineItems.length" v-on:click="store.nextStepAction()">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from './stores/basketStore'
import BookList from './components/BookList.vue'
import Basket from './components/Basket.vue'
import Payment from './components/Payment.vue'

export default {
  name: 'app',
  components: {
    BookList,
    Basket,
    Payment
  },
  data () {
    return {
      store: store
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
  }

  .right-panel {
    border-left: 1px solid #ccc;

    > .inner {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }

  .right-panel-content {
    padding: 1em;
    flex: auto;
    overflow: scroll;
  }
</style>
