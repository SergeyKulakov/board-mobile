import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { View } from 'react-native'

import {
  Container,
  SelectWrapper,
  DownArrow,
  Text,
  CalendarIcon,
  BottomButtonsWrapper,
  Label,
  SelectContainer,
} from './style'

const PickerRootScreen = ({
  date,
  hour,
  minute,
  onClickDate,
  onClickHour,
  onClickMinute,
  t,
}) => {
  const renderSelectButton = (title, value, onClick) => (
    <SelectContainer
      width="45%"
      onPress={onClick}
      disabled={!_.isFunction(onClick)}
    >
      <View>
        <Label>{title}</Label>
        <SelectWrapper>
          <Text>{value}</Text>
          <DownArrow />
        </SelectWrapper>
      </View>
    </SelectContainer>
  )

  return (
    <Container>
      <SelectContainer onPress={onClickDate}>
        <View>
          <Label>{t('jobDetail.scheduleDate')}</Label>
          <SelectWrapper>
            <Text>{date}</Text>
            <CalendarIcon />
          </SelectWrapper>
        </View>
      </SelectContainer>
      <BottomButtonsWrapper>
        {renderSelectButton('Hour', hour, onClickHour)}
        {renderSelectButton('Minute', minute, onClickMinute)}
      </BottomButtonsWrapper>
    </Container>
  )
}

PickerRootScreen.propTypes = {
  date: PropTypes.string,
  hour: PropTypes.string,
  minute: PropTypes.string,
  onClickDate: PropTypes.func,
  onClickHour: PropTypes.func,
  onClickMinute: PropTypes.func,
  t: PropTypes.func,
}

export default PickerRootScreen
