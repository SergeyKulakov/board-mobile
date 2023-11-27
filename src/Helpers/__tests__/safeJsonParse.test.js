import { safeJsonParse } from '../saveJsonParse'

describe('Helpers/safeJsonParse', () => {
  it('without error', () => {
    const result = safeJsonParse('{"title":"title"}')

    expect(result).toStrictEqual([null, { title: 'title' }])
  })

  it('with error', () => {
    const result = safeJsonParse('"{"title":"title""')

    expect(result).toStrictEqual([
      'Unexpected token t in JSON at position 3',
      null,
    ])
  })
})
