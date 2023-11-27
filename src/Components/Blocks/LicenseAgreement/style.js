import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'

export const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
`

export const Text = styled.Text`
  color: ${colors.textGray};
  font-size: 18;
`

export const Link = styled.Text`
  color: ${colors.blue};
  font-weight: bold;
  font-size: 18;
`
