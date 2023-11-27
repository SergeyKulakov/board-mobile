import { getLinkArray, getParamsWithUnits } from '../user'

describe('Helpers.users', () => {
  it('getLinkArray', () => {
    const links = new Array(4).fill('some link')

    const result = getLinkArray(links)

    expect(result).toStrictEqual(
      new Array(4)
        .fill({
          link: 'some link',
          image: null,
          _needUpdate: true,
          title: null,
          id: '',
        })
        .map((el, index) => ({ ...el, id: index })),
    )
  })

  it('invalid call getLinkArray', () => {
    const result = getLinkArray('string')

    expect(result).toStrictEqual([])
  })

  it('getParamsWithUnits', () => {
    const request = {
      params: {
        option1: 'option1',
        option2: 'option2',
      },
    }

    const store = {
      getState: () => ({
        user: {
          user: {
            country: 'USA',
          },
        },
      }),
    }

    const result = getParamsWithUnits(request, store)

    expect(result).toStrictEqual({
      params: {
        ...request.params,
        length_units: 'kilometre',
      },
    })
  })
})
