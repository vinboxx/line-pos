import axios from 'axios'
import { get } from 'lodash'

const {
  VUE_APP_API_BASE_URL,
  VUE_APP_STORE_CURRENCY,
  VUE_APP_STORE_NAME
} = process.env

class BookStore {
  state = {
    books: [],
    currency: VUE_APP_STORE_CURRENCY,
    storeName: VUE_APP_STORE_NAME
  }

  getBooksAction () {
    return axios
      .get(VUE_APP_API_BASE_URL)
      .then(response => (this.state.books = get(response, 'data.books')))
  }
}

export default new BookStore()
