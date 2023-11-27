import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'

import { hitSlop } from './config'
import { colors } from 'Themes'
import { Container, Dot } from './style'

const MoreIcon = ({ color, onClick }) => (
  <TouchableOpacity onPress={onClick} hitSlop={hitSlop}>
    <Container>
      <Dot color={color} />
      <Dot color={color} />
      <Dot color={color} />
    </Container>
  </TouchableOpacity>
)

MoreIcon.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

MoreIcon.defaultProps = {
  color: colors.blue,
}

export { MoreIcon }
