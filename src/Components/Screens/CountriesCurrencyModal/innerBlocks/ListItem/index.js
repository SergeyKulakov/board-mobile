import React from 'react'
import PropTypes from 'prop-types'

import { Container, LeftText, RightText } from './style'

const ListItem = ({ name, code, isActive, onClick }) => (
  <Container isActive={isActive} onPress={onClick}>
    <LeftText>{name}</LeftText>
    <RightText>{code}</RightText>
  </Container>
)

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
}

export { ListItem }
