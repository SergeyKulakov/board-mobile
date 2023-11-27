import { getTestID } from '../tests'

it('Helpers/getTestID', () => {
  expect(getTestID('someTestId')).toStrictEqual('[testID="someTestId"]')
})
