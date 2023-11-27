import styled from 'styled-components/native'
import { colors } from 'Themes'
import { Icon } from 'Components/UI'

export const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Part = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
`

export const Value = styled.Text`
  font-size: 25;
  color: #000;
  font-weight: bold;
`

export const IncrementButtonsWrapper = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const UpButton = styled(Icon).attrs(() => ({
  name: 'caret-up',
  color: colors.textGray,
  size: 25,
}))`
  margin-bottom: 10;
`

export const DownButton = styled(Icon).attrs(() => ({
  name: 'caret-down',
  color: colors.textGray,
  size: 25,
}))`
  margin-top: 10;
`
