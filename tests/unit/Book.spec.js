import { shallowMount } from '@vue/test-utils'
import Book from '@/components/Book.vue'

describe('Book.vue', () => {
  const props = {
    book: {
      id: '1',
      cover: '/assets/test-img.jpg',
      title: 'Brown & cony\'s secret date'
    },
    currency: '$'
  }

  it('renders empty string', () => {
    const wrapper = shallowMount(Book)

    expect(wrapper.text()).toMatch('')
  })

  it('renders book cover', () => {
    const wrapper = shallowMount(Book)

    wrapper.setProps(props)

    expect(wrapper.find('img').attributes('src')).toMatch(props.book.cover)
  })

  it('renders img alt attributes', () => {
    const wrapper = shallowMount(Book)

    wrapper.setProps(props)

    expect(wrapper.find('img').attributes('alt')).toMatch(props.book.title)
  })

  it('renders book title', () => {
    const wrapper = shallowMount(Book)

    wrapper.setProps(props)

    expect(wrapper.find('h2').text()).toMatch(props.book.title)
  })

  it('renders book price with currency', () => {
    const wrapper = shallowMount(Book)

    wrapper.setProps(props)

    expect(wrapper.find('p').text()).toMatch(props.book.price + props.currency)
  })
})
