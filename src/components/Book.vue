<template>
  <div class="book-container" v-if="book" v-on:click="store.addItemAction(book)">
    <div class="book">
      <img :src="book.cover" :alt="book.title">
    </div>
    <h2>{{ book.title }}</h2>
    <p>{{ book.price + currency }}</p>
  </div>
</template>

<script>
import store from '../stores/basketStore'

export default {
  name: 'Book',
  data: () => {
    return {
      store
    }
  },
  props: {
    book: Object,
    currency: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  $color-bg: #fde3a7;
  $book-color-bg: lighten($color-bg, 20%);
  $book-color-border: lighten(#000, 85%);
  $book-border: 1px solid $book-color-border;

  %book-rounded-corners {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .book-container {
    display: inline-block;
    text-align: center;
    padding: 1em;
    box-sizing: border-box;
  }

  .book {
    @extend %book-rounded-corners;

    cursor: pointer;
    display: inline-block;
    width: 150px;
    height: 220px;
    position: relative;
    background: $book-color-bg;
    z-index: 1;
    box-shadow: 0 2px 4px 0 rgba(#000, .1), 0 9px 20px 0 rgba(#000, .5);
    overflow: hidden;
    transition: box-shadow .3s linear;
  }

  .book img {
    @extend %book-rounded-corners;

    width: inherit;
    height: inherit;
    transform-origin: 0 50%;
    transform: rotateY(0);
    transition: all .45s ease;
  }

  .book:hover {
    box-shadow: 0 2px 4px 0 rgba(#000, .25), 0 9px 20px 0 rgba(#000, .45);

    img {
      transform: rotateY(-25deg);
      box-shadow: 1px 1px 5px 5px rgba(#000, .2);
    }
  }

  .book::after,
  .book::before {
    @extend %book-rounded-corners;

    content: '';
    display: block;
    width: inherit;
    height: inherit;
    position: absolute;
    z-index: -1;
    top: 0;
    background: $book-color-bg;
    border: $book-border;
  }

  .book::before {
    left: -3px;
  }

  .book::after {
    left: -6px;
  }
</style>
