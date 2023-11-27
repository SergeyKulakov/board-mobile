import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { Container, Currency } from './style'

const CurrencySelect = ({ value, onClick }) => (
  <Container onPress={onClick} disabled={!_.isFunction(onClick)}>
    <Currency>{value}</Currency>
  </Container>
)

CurrencySelect.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
}

export { CurrencySelect }
