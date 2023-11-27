import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { Switch, TouchableWithoutFeedback } from 'react-native'
import {
  Container,
  Right,
  Title,
  Left,
  SubTitle,
  ArrowIcon,
  SwitchWrapper,
} from './style'

const SettingRow = ({
  value,
  isDisabled,
  title,
  subTitle,
  onClick,
  onChange,
}) => (
  <TouchableWithoutFeedback
    onPress={onClick}
    disabled={!_.isFunction(onClick) || isDisabled}
  >
    <Container isDisabled={isDisabled}>
      <Right>
        <Title>{title}</Title>
        {_.isString(subTitle) ? <SubTitle>{subTitle}</SubTitle> : null}
      </Right>
      <Left isRight={_.isFunction(onClick)}>
        {_.isFunction(onChange) ? (
          <SwitchWrapper>
            <Switch value={value} onValueChange={onChange} />
          </SwitchWrapper>
        ) : (
          <ArrowIcon />
        )}
      </Left>
    </Container>
  </TouchableWithoutFeedback>
)

SettingRow.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  subTitle: PropTypes.string,
  title: PropTypes.string,
  isDisabled: PropTypes.bool,
}

export { SettingRow }
