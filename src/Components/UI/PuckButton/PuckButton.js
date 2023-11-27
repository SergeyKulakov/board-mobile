import React from 'react'
import PropTypes from 'prop-types'

import { Container, Text } from './style'

const PuckButton = ({ style, textStyle, children, onClick, outline }) => (
  <Container outline={outline} style={style} onPress={onClick}>
    <Text outline={outline} style={textStyle}>{children}</Text>
  </Container>
)

PuckButton.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  textStyle: PropTypes.object,
  outline: PropTypes.bool,
}

export default PuckButton
