import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'
import { space } from 'styled-system'

export const Container = styled.View``

export const Block = styled.View`
  ${space};
`

export const Header = styled.View`
  margin-bottom: 20;
`

export const ErrorText = styled.Text`
  margin-top: 5;
  font-size: 12;
  color: ${colors.red};
`
