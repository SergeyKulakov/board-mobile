import moment from 'moment'

export const getFormatedDate = date =>
  `${moment(date).format('DD MMM YYYY')}\n${moment(date).format('hh:mmA')}`
