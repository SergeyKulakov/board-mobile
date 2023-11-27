import styled from 'styled-components/native'
import { colors } from 'Themes'
import { Icon as UIIcon } from '../Icon'

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Text = styled.Text`
  color: ${colors.red};
  padding-left: 5;
`

export const Icon = styled(UIIcon).attrs({
  name: 'flag',
  size: 15,
  color: colors.red,
})``
