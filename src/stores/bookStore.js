import axios from 'axios'
import { get } from 'lodash'
import FuzzySearch from 'fuzzy-search' // Or: var FuzzySearch = require('fuzzy-search');

const {
  VUE_APP_API_BASE_URL,
  VUE_APP_STORE_CURRENCY,
  VUE_APP_STORE_NAME
} = process.env

class BookStore {
  searcher = null

  state = {
    books: [],
    currency: VUE_APP_STORE_CURRENCY,
    storeName: VUE_APP_STORE_NAME
  }

  getBooksAction () {
    return axios
      .get(VUE_APP_API_BASE_URL)
      .then(response => {
        this.state.books = get(response, 'data.books')
        this.setSearcher(
          new FuzzySearch(this.state.books, ['title'], { caseSensitive: false, sort: true })
        )
      })
  }

  setSearcher (searcher) {
    this.searcher = searcher
  }

  searchAction (keyword) {
    return this.searcher.search(keyword)
  }
}

export default new BookStore()
