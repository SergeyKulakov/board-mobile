import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'

export const Container = styled.View`
  flex: 1;
`

export const Content = styled.View`
  flex: 1;
  padding-right: 3%;
  padding-left: 3%;
  width: 100%;
  max-width: 500;
  margin: 0 auto;
`

export const SignInLink = styled.Text`
  font-size: 18;
  color: ${colors.blue};
  text-align: center;
  margin-bottom: 30;
`
