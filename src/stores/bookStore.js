/* eslint-disable no-console */
import axios from 'axios'
import { get } from 'lodash'

const { VUE_APP_API_BASE_URL, VUE_APP_STORE_NAME } = process.env

class BookStore {
  state = {
    books: [],
    storeName: VUE_APP_STORE_NAME
  }

  getBooksAction () {
    if (this.debug) console.log('setBooksAction triggered')
    return axios
      .get(VUE_APP_API_BASE_URL)
      .then(response => (this.state.books = get(response, 'data.books')))
  }
}

export default new BookStore()
