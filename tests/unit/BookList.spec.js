import { shallowMount } from '@vue/test-utils'
import BookList from '@/components/BookList.vue'
import Book from '@/components/Book.vue'

describe('BookList.vue', () => {
  const mockBooks = [
    {
      id: '1',
      cover: '/assets/test-img-01.jpg',
      title: 'Brown & cony\'s secret date'
    },
    {
      id: '2',
      cover: '/assets/test-img-02.jpg',
      title: 'Brown & cony\'s secret date 2'
    }
  ]

  it('renders books', async () => {
    const wrapper = shallowMount(BookList)

    wrapper.setProps({ books: mockBooks })

    expect(wrapper.findAll(Book).length).toBe(2)
  })
})
