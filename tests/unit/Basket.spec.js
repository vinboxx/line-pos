import { shallowMount } from '@vue/test-utils'
import Basket from '@/components/Basket.vue'

describe('Basket.vue', () => {
  it('renders a message', () => {
    const data = {
      store: {
        state: {
          lineItems: []
        }
      },
      emptyMsg: 'Please select book'
    }
    const wrapper = shallowMount(Basket)

    wrapper.setData(data)

    expect(wrapper.text()).toMatch(data.emptyMsg)
  })
})
