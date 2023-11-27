import styled from 'styled-components/native'
import { colors } from 'Themes'

import { Icon } from 'Components/UI'
import { isIos } from 'Helpers/iphoneX'

export const Container = styled.View`
  flex: 1;
  height: 60%;
  min-height: 300;
`

export const BackIcon = styled(Icon).attrs(() => ({
  type: 'ion',
  name: 'ios-arrow-back',
  color: colors.blue,
}))`
  position: absolute;
  top: 25;
  left: 30;
`

export const ButtonsWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: flex-end;
  margin-top: 20;
  padding-left: 15;
  padding-right: 15;
  padding-bottom: 20;
  justify-content: ${p => (p.isOneButton ? 'center' : 'space-around')};
`

export const PickerWrapper = styled.View`
  flex: 1;
`

export const CustomPicker = styled.FlatList`
  flex: 1;
  max-height: 300;
`

export const PickerItemWrapper = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 3;
  padding-bottom: 3;
  width: 100%;
`

export const PickerItemText = styled.Text`
  font-size: 25;
  color: ${colors.textGray};
  opacity: ${p => (p.isActive ? 1 : 0.6)};
  font-weight: bold;
  text-align: center;
`

export const BudgetWrapper = styled.View`
  margin-top: 20;
  flex-direction: row;
  padding-right: 18;
  padding-left: 18;
  margin-bottom: 10;
`

export const InputContainer = styled.View`
  flex: 1;
`

export const CurrencySelectWrapper = styled.View`
  max-height: 55;
`

const buttonSize = {
  paddingTop: 10,
  paddingBottom: 10,
  paddingRight: 20,
  paddingLeft: 20,
}

export default {
  submitButton: {
    container: buttonSize,
  },
  cancelButton: {
    container: buttonSize,
    gradient: {
      start: colors.addServiceBtn.start,
      end: colors.addServiceBtn.end,
    },
    color: colors.black,
  },
}
