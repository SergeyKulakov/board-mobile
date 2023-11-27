import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { Switch, TouchableWithoutFeedback } from 'react-native'
import { Container, Left, Title, SwitchText } from './style'

const SortItem = ({
  title,
  isActive,
  value,
  onSwitchClick,
  onClick,
  activeText,
  disableText,
}) => {
  return (
    <TouchableWithoutFeedback
      onPress={onClick}
      disabled={!_.isFunction(onClick)}
    >
      <Container>
        <Title isActive={isActive}>{title}</Title>
        <Left>
          {_.isBoolean(value) ? (
            <SwitchText>{value ? activeText : disableText}</SwitchText>
          ) : null}
          <Switch
            value={_.isBoolean(value) && value}
            disabled={!_.isBoolean(value)}
            onValueChange={onSwitchClick}
          />
        </Left>
      </Container>
    </TouchableWithoutFeedback>
  )
}

SortItem.propTypes = {
  title: PropTypes.string,
  isActive: PropTypes.bool,
  value: PropTypes.bool,
  onSwitchClick: PropTypes.func,
  onClick: PropTypes.func,
  activeText: PropTypes.string,
  disableText: PropTypes.string,
}

export { SortItem }
