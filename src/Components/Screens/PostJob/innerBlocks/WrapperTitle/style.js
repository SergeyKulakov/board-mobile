import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'

export const Text = styled.Text`
  font-size: 20;
  color: ${p => (p.error ? colors.red : colors.black)};
  font-weight: bold;
`
