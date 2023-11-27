import { secondsToTime } from '../time'

it('Helpers > secondsToTime', () => {
  expect(secondsToTime(55)).toStrictEqual('0:55')
  expect(secondsToTime(190)).toStrictEqual('3:10')
})
