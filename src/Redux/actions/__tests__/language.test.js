import { setLanguage, setSystemLanguage } from '../language'

describe('actions/language', () => {
  const callback = () => null

  it('setLanguage', () => {
    const args = ['language']
    const result = setLanguage(...args)

    expect(result).toStrictEqual({
      type: 'language/SET.REQUEST',
      language: 'language',
    })
  })
  it('setSystemLanguage', () => {
    const args = [callback]
    const result = setSystemLanguage(...args)

    expect(result).toStrictEqual({
      type: 'language/SET_SYSTEM',
      callback,
    })
  })
})
