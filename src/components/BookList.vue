<template>
  <div class="book-list-container">
    <p v-if="errored">We're sorry, we're not able to retrieve books information at the moment, please try back later</p>
    <div v-if="loading" class="loading" />
    <div v-else class="book-list">
      <Book
          v-for="book in bookStore.state.books"
          v-bind:key="book.id"
          v-bind:currency="bookStore.state.currency"
          v-bind:book="book">
      </Book>
    </div>
  </div>
</template>

<script>
import Book from './Book.vue'
import bookStore from '../stores/bookStore'

export default {
  name: 'BookList',
  components: {
    Book
  },
  data () {
    return {
      bookStore: bookStore,
      loading: true,
      errored: false
    }
  },
  mounted () {
    bookStore.getBooksAction()
      .catch(() => {
        this.errored = true
      })
      .finally(() => (this.loading = false))
  }
}
</script>

<style scoped lang="scss">
  .book-list-container {
    width: 100%;
  }

  .book-list {
    display: flex;
    flex-wrap: wrap;

    > .book-container {
      width: 50%;

      @media screen and (min-width: 768px){
        width: 50%;
      }
    }
  }
</style>
