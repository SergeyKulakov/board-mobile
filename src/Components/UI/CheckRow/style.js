import styled from 'styled-components/native'
import { colors } from 'Themes'
import { Icon } from 'Components/UI/Icon'

export const Wrapper = styled.View`
  flex-direction: row;
  align-items: flex-start;
`

export const CheckIcon = styled(Icon).attrs(() => ({
  name: 'check',
  size: 20,
  color: colors.jade,
}))`
  margin-right: 20;
`

export const Text = styled.Text`
  font-size: 18;
  color: ${colors.textGray};
  max-width: 90%;
`
