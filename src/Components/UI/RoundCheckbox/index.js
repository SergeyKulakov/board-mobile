import React from 'react'
import PropTypes from 'prop-types'
import { hitSlop } from 'Constants/hitSlop'

import { TouchableOpacity } from 'react-native'

import { Wrapper, Dot } from './style'

const RoundCheckbox = ({ isActive, disabled, onClick }) => (
  <TouchableOpacity onPress={onClick} disabled={disabled} hitSlop={hitSlop}>
    <Wrapper>
      <Dot isActive={isActive} />
    </Wrapper>
  </TouchableOpacity>
)

RoundCheckbox.propTypes = {
  isActive: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}

export { RoundCheckbox }
