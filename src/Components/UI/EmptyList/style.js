import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 40;
  margin-bottom: 40;
`

export const Text = styled.Text`
  text-align: center;
  font-size: 20;
  color: ${colors.textGray};
`
