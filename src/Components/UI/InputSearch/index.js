import React from 'react'
import PropTypes from 'prop-types'
import { colors } from 'Themes'

import { Icon } from '../Icon'
import { Container, Input, IconContainer } from './style'

const InputSearch = ({
  value,
  placeholder,
  disabled,
  onChange,
  onFocus,
  onBlur,
  onSubmit,
  ...props
}) => (
  <Container>
    <IconContainer>
      <Icon name="search" size={20} color={colors.blue} onClick={onSubmit} />
    </IconContainer>
    <Input
      value={value}
      onChangeText={onChange}
      editable={!disabled}
      placeholder={placeholder}
      onFocus={onFocus}
      onBlur={onBlur}
      onSubmitEditing={onSubmit}
      {...props}
    />
  </Container>
)

InputSearch.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onSubmit: PropTypes.func,
}

export { InputSearch }
