import React from 'react'
import PropTypes from 'prop-types'

import { TouchableOpacity } from 'react-native'
import { colors } from 'Themes'
import { Icon } from '../Icon'

import { Container, Text, Box } from './style'

const Checkbox = ({ checked, text, onChange }) => (
  <Container>
    <TouchableOpacity testID="touchableField" onPress={onChange}>
      <Box isActive={checked}>
        <Icon name="check" size={23} color={colors.white} visible={checked} />
      </Box>
    </TouchableOpacity>
    <Text testID="textContainer">{text}</Text>
  </Container>
)

Checkbox.propTypes = {
  checked: PropTypes.bool,
  text: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export { Checkbox }
