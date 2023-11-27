import moment from 'moment'

export const getMessageTime = date => {
  const TODAY = moment()
  const YESTERDAY = moment().date(TODAY.get('date') - 1)

  const data = Number(date)

  if (moment(data).isSame(TODAY, 'day')) return moment(data).format('HH:mm')
  if (moment(data).isSame(YESTERDAY, 'day')) return 'Yesterday'
  return moment(data).format('DD MMM YYYY')
}
