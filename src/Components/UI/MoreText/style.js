import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Text = styled.Text`
  font-size: 16;
  color: ${colors.textGray};
`

export const PlusButton = styled(Text)`
  color: ${colors.blue};
`
