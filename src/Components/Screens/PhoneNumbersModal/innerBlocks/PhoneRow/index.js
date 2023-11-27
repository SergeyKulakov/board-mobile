import React from 'react'
import PropTypes from 'prop-types'

import { FlagIcon } from 'Components/UI'

import { Container, Text, TextNumber, Right } from './style'

const PhoneRow = ({ country, flag, phone, isActive, onClick }) => (
  <Container isActive={isActive} onPress={onClick}>
    <Text isActive={isActive}>{country}</Text>
    <Right>
      <TextNumber isActive={isActive}>{phone}</TextNumber>
      <FlagIcon fileName={flag} />
    </Right>
  </Container>
)

PhoneRow.propTypes = {
  country: PropTypes.string,
  flag: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  phone: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
}

export { PhoneRow }
