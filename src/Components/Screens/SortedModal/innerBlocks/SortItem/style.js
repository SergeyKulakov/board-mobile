import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  margin-vertical: 5;
`

export const Title = styled.Text`
  font-size: 18;
  color: ${p => (p.isActive ? colors.blue : colors.textGray)};
  flex: 1;
`

export const Left = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
`

export const SwitchText = styled.Text`
  font-size: 14;
  color: ${colors.disabledGray};
  margin-right: 5;
  text-align: right;
  flex-direction: row;
  flex: 1;
`
