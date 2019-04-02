import { shallowMount, mount } from '@vue/test-utils'
import axios from 'axios'
import App from '@/App.vue'

jest.mock('axios', () => ({
  get: jest.fn()
}))

describe('App.vue', () => {
  const mockBooks = [{
    id: '1',
    cover: '/assets/test-img.jpg',
    title: 'Brown & cony\'s secret date'
  }]

  beforeEach(() => {
    axios.get.mockClear()
  })

  it('renders data.storeName when set', () => {
    axios.get.mockReturnValue(Promise.resolve({ data: { books: mockBooks } }))

    const storeName = 'Cony Book Shop'

    const wrapper = shallowMount(App)

    wrapper.setData({ storeName })

    expect(wrapper.text()).toMatch(storeName)
  })

  it('set correct errored state whenfetching books failed', async () => {
    axios.get.mockReturnValue(Promise.reject(new Error('something failed')))

    const wrapper = shallowMount(App)

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.errored).toBe(true)
  })

  it('set correct loading state when fetching books finished', async () => {
    axios.get.mockReturnValue(Promise.resolve({ data: { books: mockBooks } }))

    const wrapper = shallowMount(App)

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.loading).toBe(false)
  })

  it('found one book when search with "brown"', async () => {
    axios.get.mockReturnValue(Promise.resolve({ data: { books: mockBooks } }))

    const wrapper = shallowMount(App)

    await wrapper.vm.$nextTick()

    const input = wrapper.find('.search-box input')
    input.setValue('brown')
    input.trigger('change')

    expect(wrapper.vm.books).toEqual(mockBooks)
  })

  it('Clear keyword before go to next page', async () => {
    axios.get.mockReturnValue(Promise.resolve({ data: { books: mockBooks } }))

    const wrapper = mount(App)

    await wrapper.vm.$nextTick()

    wrapper.findAll('.book').at(0).trigger('click')
    wrapper.find('.btn-next').trigger('click')

    expect(wrapper.vm.keyword).toBe('')
  })
})
