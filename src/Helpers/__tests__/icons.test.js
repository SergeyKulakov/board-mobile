import { getNavigationIconStyle } from '../icons'

describe('getNavigationIconStyle', () => {
  it('with icon', () => {
    const icon = 'icon'

    const result = getNavigationIconStyle(icon)

    expect(result).toStrictEqual({
      name: 'icon',
      size: 20,
      color: '#3d85f4',
    })
  })

  it('with icon as object', () => {
    const icon = {
      name: 'name',
      type: 'type',
    }

    const result = getNavigationIconStyle(icon, 15)

    expect(result).toStrictEqual({
      name: 'name',
      type: 'type',
      size: 15,
      color: '#3d85f4',
    })
  })
})
