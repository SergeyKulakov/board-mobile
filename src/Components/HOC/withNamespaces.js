import React from 'react'

import _ from 'lodash'
import i18n from 'I18N'
// redux
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getActiveLanguage } from 'Redux/selectors/settings'

import { languages } from 'Constants/languages'

function withNamespaces(Component) {
  return class extends React.PureComponent {
    t = (path, fallbackText) =>
      _.get(
        i18n.t(path.split('.')[0]),
        path
          .split('.')
          .slice(1)
          .join('.'),
        fallbackText ||
          path
            .split('.')
            .slice(-1)
            .join(),
      )

    getCurrentLanguage = key => {
      let language = languages.find(el => el.type === i18n.locale.slice(0, 2))

      language = language || languages[0]

      if (_.isString(key)) return language[key]
      return language
    }

    getError = (error, path = 'apiErrors') => {
      try {
        const message = _.get(error, 'payload.message', '')
        const code = _.get(error, 'payload.code', '')
        const payload = _.get(error, 'payload', '')

        if (code === 'jobLongerAvailable') {
          return i18n.t('notifications.jobLongerAvailable')
        }

        if (
          payload === 'Internal server error' ||
          message === 'Internal server error' ||
          message === 'Internal Server Error' ||
          code === 'internal'
        )
          return i18n.t('apiErrors.InternalServerError')

        if (
          _.get(error, 'message') === 'Unauthorized' ||
          payload === 'Unauthorized'
        ) {
          return i18n.t('apiErrors.unauthorizedError')
        }

        if (!code) {
          return message || (_.isString(payload) ? payload : '')
        }

        return i18n.t(`${path}.${code}`)
      } catch (err) {
        if (__DEV__) console.warn(err)
        return err.message
      }
    }

    render() {
      return (
        <Component
          {...this.props}
          t={this.t}
          getError={this.getError}
          getCurrentLanguage={this.getCurrentLanguage}
        />
      )
    }
  }
}

const actions = {}

const selectors = createStructuredSelector({
  activeLanguage: getActiveLanguage,
})

export default compose(
  connect(
    selectors,
    actions,
  ),
  withNamespaces,
)
