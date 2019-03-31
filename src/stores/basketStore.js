/* eslint-disable no-console */
import axios from 'axios'
import { get } from 'lodash'

const { VUE_APP_API_BASE_URL } = process.env
const VUE_APP_SERIES_BOOKS_ID = process.env.VUE_APP_SERIES_BOOKS_ID.split(',')
const VUE_APP_SERIES_BOOKS_DISCOUNT_PERCENT = process.env.VUE_APP_SERIES_BOOKS_DISCOUNT_PERCENT.split(',')

class Store {
  debug = true

  state = {
    books: [],
    cashRecieved: 0,
    lineItems: [],
    total: 0,
    discount: 0,
    step: 1
  }

  getBooksAction () {
    if (this.debug) console.log('setBooksAction triggered')
    return axios
      .get(VUE_APP_API_BASE_URL)
      .then(response => (this.state.books = get(response, 'data.books')))
  }

  addItemAction (item) {
    if (this.debug) console.log('setMessageAction triggered with', item)
    const { lineItems } = this.state
    const existingItem = lineItems.find(litem => item.id === litem.id)
    if (existingItem) {
      existingItem.qty += 1
    } else {
      lineItems.push({
        ...item,
        qty: 1
      })
    }

    this.calculateBasket()
  }

  removeItemAction (item) {
    if (this.debug) console.log('removeItemAction triggered with', item)
    this.state.lineItems = this.state.lineItems.filter(litem => litem.id !== item.id)

    this.calculateBasket()
  }

  hasDiscount (id) {
    return VUE_APP_SERIES_BOOKS_ID.includes(id)
  }

  calculateBasket () {
    const discountItems = this.state.lineItems
      .filter(item => this.hasDiscount(item.id))

    const discount = this.state.lineItems.reduce((prev, cur) => {
      const dc = this.hasDiscount(cur.id)
        ? VUE_APP_SERIES_BOOKS_DISCOUNT_PERCENT[discountItems.length] / 100
        : 0
      return prev + (parseInt(cur.price) * dc)
    }, 0)

    const total = this.state.lineItems.reduce((prev, cur) => {
      return prev + (parseInt(cur.price) * cur.qty)
    }, 0)

    console.log('discountItems', discountItems)

    this.state.discount = discount
    this.state.total = (total - discount)
  }

  clearBasketAction () {
    if (this.debug) console.log('clearBasketAction triggered')
    this.state.lineItems = []
  }

  nextStepAction () {
    if (this.debug) console.log('nextStepAction triggered')
    let { step } = this.state
    const { lineItems } = this.state

    if (step === 1 && lineItems.length) {
      this.state.step = 2
    }
  }

  prevStepAction () {
    if (this.debug) console.log('prevStepAction triggered')
    this.state.step -= 1
  }

  setCashRecieved (value) {
    if (this.debug) console.log('setCashRecieved triggered', value)
    this.state.cashRecieved = value
  }
}

export default new Store()
