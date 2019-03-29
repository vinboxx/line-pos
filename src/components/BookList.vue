<template>
  <div class="book-list">
    <Book
        v-for="book in books"
        v-bind:key="book.id"
        v-bind:book="book">
    </Book>
  </div>
</template>

<script>
import Book from './Book.vue'

export default {
  name: 'BookList',
  components: {
    Book
  },
  props: {
    books: Array
  }
}
</script>

<style scoped lang="scss">
  .book-list {
    display: flex;
    flex-wrap: wrap;
  }
</style>
