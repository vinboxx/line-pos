import { shallowMount } from '@vue/test-utils'
import Payment from '@/components/Payment.vue'

describe('Payment.vue', () => {
  it('renders first accordion with active class when click accordion title', () => {
    const wrapper = shallowMount(Payment)

    wrapper.findAll('.title').at(0).trigger('click')

    expect(wrapper.findAll('.accordion-item').at(0).classes()).toContain('active')
  })

  it('renders second accordion with active class when click accordion title', () => {
    const wrapper = shallowMount(Payment)

    wrapper.findAll('.title').at(1).trigger('click')

    expect(wrapper.findAll('.accordion-item').at(1).classes()).toContain('active')
  })
})
