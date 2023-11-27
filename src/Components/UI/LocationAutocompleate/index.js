import React from 'react'
import PropTypes from 'prop-types'

import { TouchableOpacity } from 'react-native'

import { Container, Label, Content, Text } from './style'

const LocationAutocomplete = ({
  label,
  placeholder,
  value,
  onClick,
  isError,
}) => (
  <Container>
    <TouchableOpacity onPress={onClick}>
      <Label isActive={value || placeholder}>{label}</Label>
      <Content error={isError}>
        <Text isActive={value}>{value || placeholder || label}</Text>
      </Content>
    </TouchableOpacity>
  </Container>
)

LocationAutocomplete.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  isError: PropTypes.bool,
}

export { LocationAutocomplete }
