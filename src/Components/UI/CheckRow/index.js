import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, CheckIcon, Text } from './style'

const CheckRow = ({ text, children }) => (
  <Wrapper>
    <CheckIcon />
    <Text>{text || children}</Text>
  </Wrapper>
)

CheckRow.propTypes = {
  text: PropTypes.string,
  children: PropTypes.string,
}

export { CheckRow }
