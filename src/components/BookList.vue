<template>
  <div class="book-list-container">
    <div v-if="books && books.length" class="book-list">
      <Book
          v-for="book in books"
          v-bind:key="book.id"
          v-bind:currency="bookStore.state.currency"
          v-bind:book="book">
      </Book>
    </div>
    <p v-else>No book found</p>
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
      bookStore: bookStore
    }
  },
  props: {
    books: Array
  }
}
</script>

<style scoped lang="scss">
  .book-list-container {
    overflow-y: scroll;
    width: 100%;
    flex: 1;
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
