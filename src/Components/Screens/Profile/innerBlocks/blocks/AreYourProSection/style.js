import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Text = styled.Text`
  font-size: 18;
  font-weight: bold;
  color: ${colors.black};
`
