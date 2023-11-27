import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Box = styled.View`
  width: 25;
  height: 25;
  background: ${p =>
    p.isActive ? colors.checkbox.active : colors.checkbox.normal};
  border-radius: 5;
  border-style: solid;
  border-width: ${p => (p.isActive ? 0 : 1)};
  border-color: ${colors.blue};
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-right: 10;
`

export const Text = styled.Text`
  color: ${colors.textGray};
  font-size: 18;
`
