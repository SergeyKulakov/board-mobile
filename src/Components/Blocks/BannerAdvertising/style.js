import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'

export const Container = styled.ImageBackground`
  align-items: flex-start;
  flex: 1;
`

export const TextContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding-left: 2%;
`

export const Text = styled.Text`
  font-size: 18;
  color: ${colors.black};
  font-weight: bold;
`
