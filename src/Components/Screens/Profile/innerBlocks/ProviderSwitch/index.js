import React from 'react'
import PropTypes from 'prop-types'

import { Switch } from 'react-native'
import { ShadowBox } from 'Components/UI'

import { Container, Title } from './style'

const ProviderSwitch = ({ text, value, onSwitchClick }) => (
  <ShadowBox>
    <Container>
      <Title>{text}</Title>
      <Switch value={value} onValueChange={onSwitchClick} />
    </Container>
  </ShadowBox>
)

ProviderSwitch.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.bool,
  onSwitchClick: PropTypes.func.isRequired,
}

export { ProviderSwitch }
