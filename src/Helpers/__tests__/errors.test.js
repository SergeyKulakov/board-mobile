import { getError } from '../errors'

describe('Helpers/getError', () => {
  it('should return 500 error message', () => {
    expect(getError({ payload: { code: 'internal' } })).toBe(
      'Internal Server Error',
    )

    expect(
      getError({
        payload: {
          message: 'Internal Server Error',
        },
      }),
    ).toBe('Internal Server Error')

    expect(
      getError({
        payload: {
          message: 'Internal server error',
        },
      }),
    ).toBe('Internal Server Error')

    expect(
      getError({
        payload: 'Internal server error',
      }),
    ).toBe('Internal Server Error')
  })

  it('should return Unauthorized error message', () => {
    expect(getError({ payload: 'Unauthorized' })).toBe('Unauthorized')
    expect(getError({ message: 'Unauthorized' })).toBe('Unauthorized')
  })

  it('without code', () => {
    expect(getError({ payload: 'some error' })).toBe('some error')
    expect(
      getError({
        payload: {
          message: 'some error',
        },
      }),
    ).toBe('some error')
  })

  it('with some code', () => {
    expect(getError({ payload: { code: 'notVerifiedLogin' } })).toBe(
      'It seems your login was not verified. Please sign in with your username',
    )
  })
})
