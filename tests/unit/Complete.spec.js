import { shallowMount } from '@vue/test-utils'
import Complete from '@/components/Complete.vue'

describe('Complete.vue', () => {
  it('renders a message', () => {
    const data = {
      msg: 'Thank you!'
    }
    const wrapper = shallowMount(Complete)

    wrapper.setData(data)

    expect(wrapper.find('p').text()).toMatch(data.msg)
  })
})
