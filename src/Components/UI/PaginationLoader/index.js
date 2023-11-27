import React from 'react'
import PropTypes from 'prop-types'
import { colors } from 'Themes'

import { ActivityIndicator } from 'react-native'

import { Container } from './style'

const PaginationLoader = ({ visible, containerStyle, size, color }) => {
  if (!visible) return null

  return (
    <Container style={containerStyle}>
      <ActivityIndicator size={size} color={color} />
    </Container>
  )
}

PaginationLoader.propTypes = {
  visible: PropTypes.bool,
  containerStyle: PropTypes.object,
  size: PropTypes.string,
  color: PropTypes.string,
}

PaginationLoader.defaultProps = {
  visible: false,
  size: 'small',
  color: colors.blue,
}

export { PaginationLoader }
