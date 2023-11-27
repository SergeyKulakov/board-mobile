import styled from 'styled-components/native'
import { colors } from 'Themes'
import { width } from 'styled-system'
import { Icon } from '../Icon'

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin-top: 30;
  padding-left: 15;
  padding-right: 15;
`

export const SelectWrapper = styled.View`
  margin-top: 5;
  border: solid 1px ${colors.disabledGray};
  border-radius: 5;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 5;
  padding-right: 5;
  padding-top: 5;
  padding-bottom: 5;
  height: 40;
  width: 100%;
`

export const SelectContainer = styled.TouchableOpacity`
  flex-direction: column;
  width: 100%;
  ${width};
`

export const Text = styled.Text`
  font-size: 16;
  color: ${colors.black};
`

export const DownArrow = styled(Icon).attrs(() => ({
  type: 'ion',
  name: 'ios-arrow-down',
  color: colors.blue,
}))``

export const CalendarIcon = styled(Icon).attrs(() => ({
  name: 'calendar',
  color: colors.blue,
}))``

export const BottomButtonsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10;
  width: 100%;
`

export const Label = styled.Text`
  font-size: 14;
  color: ${colors.textGray};
`
