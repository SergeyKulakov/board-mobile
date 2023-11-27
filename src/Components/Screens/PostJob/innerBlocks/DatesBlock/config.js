import moment from 'moment'

export const DONE_BEFORE = 'DONE_BEFORE'
export const EXPIRATION_DATE = 'EXPIRATION_DATE'

export const getDoneBeforeDate = date => {
  if (moment(date).isValid()) {
    return moment(date).format('DD-MM-YYYY')
  }

  return ''
}

export const getExpirationDate = date => {
  if (moment(date).isValid()) {
    return moment(date).format('YYYY-MM-DD HH:mm')
  }

  return ''
}
