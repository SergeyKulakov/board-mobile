import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import { GradientContainer } from '../GradientContainer'

import { container, Text } from './style'

const ModalButton = ({ text, onClick, children }) => (
  <TouchableOpacity onPress={onClick}>
    <GradientContainer style={container}>
      <Text>{children || text}</Text>
    </GradientContainer>
  </TouchableOpacity>
)

ModalButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string,
}

export { ModalButton }
