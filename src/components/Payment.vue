<template>
  <div class="payment-container">
    <p>Payment method:</p>
      <div class="accordion-item" v-bind:class="{ active: payment === 'cash' }">
          <p class="title" v-on:click="selectPayment('cash')">
            <icon-cash class="icon" :fill="payment === 'cash' ? '#fff' : '#402d20'" />
            Cash
          </p>
          <div class="content">
            <input type="number" class="input"
              placeholder="Amount of cash"
              v-on:change="(e) => store.setCashReceived(e.target.value)"
              v-on:keyup="(e) => store.setCashReceived(e.target.value)" />
          </div>
      </div>
      <div class="accordion-item" v-bind:class="{ active: payment === 'credit-card' }">
          <h4 class="title" v-on:click="selectPayment('credit-card')">
            <icon-credit-card class="icon" :fill="payment === 'credit-card' ? '#fff' : '#402d20'" />
            Credit Card
          </h4>
          <p class="content">
              Sorry. Currently paying by credit card is not support.
          </p>
      </div>
  </div>
</template>

<script>
import store from '../stores/basketStore'
import CashIcon from './Icons/Cash'
import CreditCard from './Icons/CreditCard'

export default {
  name: 'Payment',
  components: {
    'icon-cash': CashIcon,
    'icon-credit-card': CreditCard
  },
  data () {
    return {
      payment: 'cash',
      store: store
    }
  },
  methods: {
    selectPayment (payment) {
      this.payment = payment
    }
  }
}
</script>

<style scoped lang="scss">
  .payment-container {
    text-align: left;
    padding: 1em;
    background-color: #e2d9d0;
    height: 100%;
  }

  .accordion-item {
      background-color: #fff;
      box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
      color: #4a4a4a;
      max-width: 100%;
      position: relative;
      margin-bottom: 1em;

      > .title {
        align-items: center;
        color: #363636;
        display: flex;
        flex-grow: 1;
        font-weight: 700;
        padding: .75rem;
        margin: 0;
        cursor: pointer;
      }

      .content {
        padding: 1em;
        display: none;
      }

      &.active {
        .title {
          background-color: #402d20;
          color: #fff;
        }
        .content {
          display: block;
        }
      }
  }

  .icon {
    margin-right: 0.5em;
  }

  .input {
    border: 1px solid #402d20;
    width: 100%;
    padding: 1em;
    text-align: right;
    font-size: 1em;
  }
</style>
