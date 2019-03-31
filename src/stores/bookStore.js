/* eslint-disable no-console */
import axios from 'axios'
import { get } from 'lodash'

const { VUE_APP_API_BASE_URL } = process.env

class BookStore {
  state = {
    books: []
  }

  getBooksAction () {
    if (this.debug) console.log('setBooksAction triggered')
    return axios
      .get(VUE_APP_API_BASE_URL)
      .then(response => (this.state.books = get(response, 'data.books')))
  }
}

export default new BookStore()
