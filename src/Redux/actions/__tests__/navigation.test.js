import { setNavigation } from '../navigation'

describe('actions/navigation', () => {
  it('setNavigation', () => {
    const args = ['componentName']
    const result = setNavigation(...args)

    expect(result).toStrictEqual({
      type: 'navigation/SET_NAVIGATE',
      componentName: 'componentName',
    })
  })
})
