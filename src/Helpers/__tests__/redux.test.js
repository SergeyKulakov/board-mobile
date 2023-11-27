import { createAsyncAction, createReducer, createSocketAction } from '../redux'

describe('Helpers/redux', () => {
  it('createAsyncAction', () => {
    const type = 'ACTION'

    const result = createAsyncAction(type)

    expect(result).toStrictEqual({
      REQUEST: 'ACTION.REQUEST',
      SUCCESS: 'ACTION.SUCCESS',
      FAILURE: 'ACTION.FAILURE',
    })
  })

  it('createSocketAction', () => {
    const type = 'SOCKET_EVENT'

    const result = createSocketAction(type)

    expect(result).toStrictEqual({
      event: type,
    })
  })

  it('createReducer', () => {
    const initialState = {
      data: [],
    }
    const handlers = {
      TYPE: jest.fn(),
    }

    const reducer = createReducer(initialState, handlers)
    const args = [{}, { type: 'TYPE' }]

    reducer(...args)

    expect(handlers.TYPE).toHaveBeenCalledTimes(1)
    expect(handlers.TYPE).toHaveBeenCalledWith(...args)
  })
})
