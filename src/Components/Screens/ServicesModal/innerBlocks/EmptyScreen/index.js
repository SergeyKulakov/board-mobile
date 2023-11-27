import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from 'Components/UI'
import { colors } from 'Themes'

import { Container, Text } from './style'

const EmptyScreen = ({ value }) => (
  <Container>
    <Icon name="search" size={40} color={colors.textGray} />
    <Text testID="text">{value ? `${value} not found` : 'server error'}</Text>
  </Container>
)

EmptyScreen.propTypes = {
  value: PropTypes.string.isRequired,
}

export { EmptyScreen }
