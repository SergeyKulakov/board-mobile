import { loadPopularServices, loadServices } from '../services'

describe('services', () => {
  const callback = () => null

  it('loadPopularServices', () => {
    const args = [{ callback }]
    const result = loadPopularServices(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/services/popular',
        types: {
          REQUEST: 'services/LOAD_POPULAR.REQUEST',
          SUCCESS: 'services/LOAD_POPULAR.SUCCESS',
          FAILURE: 'services/LOAD_POPULAR.FAILURE',
        },
        callback,
      },
      type: 'API_CALL',
    })
  })

  it('loadServices', () => {
    const args = [{ callback }]
    const result = loadServices(...args)

    expect(result).toStrictEqual({
      fields: {
        endpoint: '/services',
        types: {
          REQUEST: 'services/LOAD.REQUEST',
          SUCCESS: 'services/LOAD.SUCCESS',
          FAILURE: 'services/LOAD.FAILURE',
        },
        callback,
      },
      type: 'API_CALL',
    })
  })
})
