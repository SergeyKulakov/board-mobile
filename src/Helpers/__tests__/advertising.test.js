import { getDataWithAds } from '../advertising'

it('Helpers/getDataWithAds', () => {
  const data = new Array(20).fill(true)

  const result = getDataWithAds(data)

  expect(result).toStrictEqual([
    true,
    true,
    true,
    'sponsor',
    true,
    true,
    'ads',
    true,
    true,
    'sponsor',
    true,
    true,
    true,
    'ads',
    true,
    true,
    true,
    true,
    'sponsor',
    true,
    'ads',
    true,
    true,
    true,
    true,
    true,
  ])
})
