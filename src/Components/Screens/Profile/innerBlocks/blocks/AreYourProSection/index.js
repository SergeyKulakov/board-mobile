import React from 'react'
import PropTypes from 'prop-types'
import { Switch } from 'react-native'

import { Container, Text } from './style'

const AreYourProSection = ({ text, value, onChange }) => (
  <Container>
    <Text>{text}</Text>
    <Switch value={value} onValueChange={onChange} />
  </Container>
)

AreYourProSection.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export { AreYourProSection }
