import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Text = styled.Text`
  color: ${colors.textGray};
  font-size: 30;
  max-width: 250;
  text-align: center;
  margin-top: 2%;
`
