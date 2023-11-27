import React from 'react'
import PropTypes from 'prop-types'

import { Text } from './style'

const WrapperTitle = ({ children, isError }) => (
  <Text error={isError}>{children}</Text>
)

WrapperTitle.propTypes = {
  isError: PropTypes.bool,
  children: PropTypes.string.isRequired,
}

export { WrapperTitle }
