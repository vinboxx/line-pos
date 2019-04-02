import { shallowMount } from '@vue/test-utils'
import axios from 'axios'
import BookList from '@/components/BookList.vue'

jest.mock('axios', () => ({
  get: jest.fn()
}))

describe('BookList.vue', () => {
  const mockBooks = [{
    id: '1',
    cover: '/assets/test-img.jpg',
    title: 'Brown & cony\'s secret date'
  }]

  beforeEach(() => {
    axios.get.mockClear()
  })

  it('set correct errored state whenfetching books failed', async () => {
    axios.get.mockReturnValue(Promise.reject(new Error('something failed')))

    const wrapper = shallowMount(BookList)

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.errored).toBe(true)
  })

  it('set correct loading state when fetching books finished', async () => {
    axios.get.mockReturnValue(Promise.resolve(mockBooks))

    const wrapper = shallowMount(BookList)

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.loading).toBe(false)
  })
})
