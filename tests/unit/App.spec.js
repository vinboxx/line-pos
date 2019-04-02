import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
  it('renders data.storeName when set', () => {
    const storeName = 'Cony Book Shop'
    const wrapper = shallowMount(App)

    wrapper.setData({ storeName })

    expect(wrapper.text()).toMatch(storeName)
  })
})
