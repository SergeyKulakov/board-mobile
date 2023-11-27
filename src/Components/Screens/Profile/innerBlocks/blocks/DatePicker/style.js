import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'

export const Text = styled.Text`
  font-size: 20;
  color: ${p => (p.isActive ? colors.black : colors.disabledGray)};
`

export const Label = styled.Text`
  font-size: 16;
  color: ${colors.textGray};
  margin-bottom: 15;
  opacity: ${p => (p.isActive ? 1 : 0)};
`

export const Content = styled.View`
  border: 0 solid ${colors.disabledGray};
  border-bottom-width: 1;
  padding-bottom: 20;
`

export const SubInfo = styled.Text`
  margin-top: 5;
  font-size: 13;
  color: ${colors.textGray};
`

export const PickerWrapper = styled.View`
  flex: 1;
  width: 100%;
  overflow: hidden;
`
