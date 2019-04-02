import basketStore from '@/stores/basketStore'

describe('basketStore.js', () => {
  const mockItems = [
    {
      id: '1',
      cover: '/assets/test-img-01.jpg',
      title: 'Brown & cony\'s secret date',
      price: 100
    },
    {
      id: '2',
      cover: '/assets/test-img-02.jpg',
      title: 'Brown & cony\'s secret date 2',
      price: 100
    },
    {
      id: '3',
      cover: '/assets/test-img-03.jpg',
      title: 'Brown & cony\'s secret date 3',
      price: 100
    },
    {
      id: '4',
      cover: '/assets/test-img-04.jpg',
      title: 'Brown & cony\'s secret date 4',
      price: 100
    },
    {
      id: '5',
      cover: '/assets/test-img-05.jpg',
      title: 'Brown & cony\'s secret date 5',
      price: 100
    },
    {
      id: '6',
      cover: '/assets/test-img-06.jpg',
      title: 'Brown & cony\'s secret date 6',
      price: 100
    }
  ]

  beforeEach(() => {
    basketStore.clearBasketAction()
  })

  it('add one item to store', () => {
    basketStore.addItemAction(mockItems[0])

    expect(basketStore.state.lineItems.length).toBe(1)
  })

  it('add two items to store', () => {
    basketStore.addItemAction(mockItems[0])
    basketStore.addItemAction(mockItems[1])

    expect(basketStore.state.lineItems.length).toBe(2)
  })

  it('add same items twice', () => {
    basketStore.addItemAction(mockItems[0])
    basketStore.addItemAction(mockItems[0])

    expect(basketStore.state.lineItems.length).toBe(1)
  })

  it('remove one item', () => {
    basketStore.addItemAction(mockItems[0])
    basketStore.addItemAction(mockItems[1])
    basketStore.removeItemAction(mockItems[0])

    expect(basketStore.state.lineItems.length).toBe(1)
  })

  it('calculate discount', () => {
    basketStore.addItemAction(mockItems[0])
    basketStore.addItemAction(mockItems[1])
    basketStore.addItemAction(mockItems[1])
    basketStore.addItemAction(mockItems[2])
    basketStore.addItemAction(mockItems[3])
    basketStore.addItemAction(mockItems[5])

    expect(basketStore.state.discount).toBe(80)
  })

  it('from step 1 to step 2', () => {
    basketStore.state.step = 1
    basketStore.state.lineItems = mockItems
    basketStore.nextStepAction()

    expect(basketStore.state.step).toBe(2)
  })

  it('from step 2 to step 3', () => {
    basketStore.state.step = 2
    basketStore.state.cashReceived = 500
    basketStore.state.total = 499
    basketStore.nextStepAction()

    expect(basketStore.state.step).toBe(3)
  })

  it('from step 3 to step 1', () => {
    basketStore.state.step = 3
    basketStore.nextStepAction()

    expect(basketStore.state.step).toBe(1)
  })

  it('unknown step should not change state', () => {
    basketStore.state.step = 4
    basketStore.nextStepAction()

    expect(basketStore.state.step).toBe(4)
  })

  it('set cash received', () => {
    basketStore.state.step = 3
    basketStore.prevStepAction()

    expect(basketStore.state.step).toBe(2)
  })

  it('set cash received', () => {
    basketStore.setCashReceived(100)

    expect(basketStore.state.cashReceived).toBe(100)
  })
})
