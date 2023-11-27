import React from 'react'

import { Linking } from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { getUser } from 'Redux/selectors/user'

function withDevTools(Component) {
  return props => {
    const handleSendError = (type, data) => {
      const body = `data: ${JSON.stringify(data)}\n user: ${JSON.stringify(
        props.user,
      )}`

      Linking.openURL(
        `mailto:vladimirfriptu@gmail.com?subject=${type}&body=${body}`,
      )
    }

    return <Component onSendError={handleSendError} {...props} />
  }
}

const selectors = createStructuredSelector({
  user: getUser,
})

export default compose(
  connect(selectors),
  withDevTools,
)
