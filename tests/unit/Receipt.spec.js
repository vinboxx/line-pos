import { shallowMount } from '@vue/test-utils'
import Receipt from '@/components/Receipt.vue'

describe('Receipt.vue', () => {
  it('renders two items', () => {
    const data = {
      basketStore: {
        state: {
          lineItems: [
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
        }
      }
    }
    const wrapper = shallowMount(Receipt)

    wrapper.setData(data)

    expect(wrapper.findAll('.item-list > li').length).toBe(2)
  })
})
