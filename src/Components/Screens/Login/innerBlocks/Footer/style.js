import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'

export const Container = styled.View`
  flex-direction: row;
  align-self: center;
  justify-content: center;
  width: 100%;
`

export const Text = styled.Text`
  color: ${p => (p.link ? colors.blue : colors.textGray)};
  font-size: 18;
  text-align: center;
  margin-right: ${p => (p.lastChild ? 0 : 4)};
`
