const VUE_APP_SERIES_BOOKS_ID = process.env.VUE_APP_SERIES_BOOKS_ID.split(/\s*,\s*/)
const VUE_APP_SERIES_BOOKS_DISCOUNT_PERCENT = process.env.VUE_APP_SERIES_BOOKS_DISCOUNT_PERCENT.split(/\s*,\s*/)

class BasketStore {
  initialState = {
    cashReceived: 0,
    lineItems: [],
    total: 0,
    discount: 0,
    step: 1
  }

  state = { ...this.initialState }

  addItemAction (item) {
    const lineItems = [ ...this.state.lineItems ]
    const existingItem = lineItems.find(litem => item.id === litem.id)
    if (existingItem) {
      existingItem.qty += 1
    } else {
      lineItems.push({
        ...item,
        qty: 1
      })
    }

    this.state.lineItems = lineItems

    this.calculateBasket()
  }

  removeItemAction (item) {
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
      const discountIndex = discountItems.length > VUE_APP_SERIES_BOOKS_DISCOUNT_PERCENT.length
        ? VUE_APP_SERIES_BOOKS_DISCOUNT_PERCENT.length - 1 : discountItems.length - 1
      const dc = this.hasDiscount(cur.id)
        ? VUE_APP_SERIES_BOOKS_DISCOUNT_PERCENT[discountIndex] / 100
        : 0
      return prev + (parseInt(cur.price) * dc)
    }, 0)

    const total = this.state.lineItems.reduce((prev, cur) => {
      return prev + (parseInt(cur.price) * cur.qty)
    }, 0)

    this.state.discount = discount
    this.state.total = (total - discount)
  }

  clearBasketAction () {
    this.state = { ...this.initialState }
  }

  nextStepAction () {
    let { step } = this.state
    const { lineItems, cashReceived, total } = this.state

    if (step === 1 && lineItems.length) {
      this.state.step = 2
    } else if (step === 2 && cashReceived >= total) {
      this.state.step = 3
    } else if (step === 3) {
      this.clearBasketAction()
    }
  }

  prevStepAction () {
    this.state.step -= 1
  }

  setCashReceived (value) {
    this.state.cashReceived = parseFloat(value)
  }
}

export default new BasketStore()
