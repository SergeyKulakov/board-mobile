import React from 'react'
import PropTypes from 'prop-types'
import Loader from 'react-native-loading-spinner-overlay'

import style from './style'

const ScreenLoader = ({ visible }) => (
  <Loader animation="fade" size="large" visible={visible} {...style} />
)

ScreenLoader.propTypes = {
  visible: PropTypes.bool,
}

ScreenLoader.defaultProps = {
  visible: true,
}

export { ScreenLoader }
