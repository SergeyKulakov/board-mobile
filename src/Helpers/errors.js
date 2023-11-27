import _ from 'lodash'
import i18n from 'I18N'

export const getError = (error, path = 'apiErrors') => {
  const message = _.get(error, 'payload.message')
  const code = _.get(error, 'payload.code')

  if (
    error.payload === 'Internal server error' ||
    message === 'Internal server error' ||
    message === 'Internal Server Error' ||
    code === 'internal'
  )
    return i18n.t('apiErrors.InternalServerError')

  if (error.message === 'Unauthorized' || error.payload === 'Unauthorized') {
    return i18n.t('apiErrors.unauthorizedError')
  }

  if (!code) return `${message || error.payload}`

  return i18n.t(`${path}.${code}`)
}
