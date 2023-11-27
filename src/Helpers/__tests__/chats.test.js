import moment from 'moment'
import { getMessageTime } from '../chats'

describe('Helpers/getMessageTime', () => {
  it('should be HH:mm formated', () => {
    const date = moment().valueOf()

    const result = getMessageTime(date)

    expect(result).toStrictEqual(moment(date).format('HH:mm'))
  })

  it('should be Yesterday', () => {
    const date = moment().subtract(1, 'day')

    const result = getMessageTime(date)

    expect(result).toStrictEqual('Yesterday')
  })

  it('should be DD MMM YYYY formated', () => {
    const date = '1571046412874'

    const result = getMessageTime(date)

    expect(result).toStrictEqual('14 Oct 2019')
  })
})
