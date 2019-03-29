<template>
  <div id="app">
    <img alt="Vue logo" class="shop-logo" src="./assets/logo.png">

    <section v-if="errored">
      <p>We're sorry, we're not able to retrieve books information at the moment, please try back later</p>
    </section>

    <section v-else>
      <div v-if="loading">Loading...</div>
      <BookList v-else :books="books" />
    </section>
  </div>
</template>

<script>
import BookList from './components/BookList.vue'
import axios from 'axios'
import { get } from 'lodash'

export default {
  name: 'app',
  components: {
    BookList
  },
  data () {
    return {
      books: [],
      loading: true,
      errored: false
    }
  },
  mounted () {
    axios
      .get(process.env.VUE_APP_API_BASE_URL)
      .then(response => (this.books = get(response, 'data.books')))
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => (this.loading = false))
  }
}
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .shop-logo {
    width: 128px;
  }

</style>
