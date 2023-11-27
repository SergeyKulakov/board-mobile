import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'
import { Icon } from 'Components/UI'

export const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Star = styled(Icon).attrs(({ isActive }) => ({
  name: isActive ? 'star' : 'star-o',
  size: 20,
  color: colors.amber,
}))`
  margin-right: 5;
  margin-left: 5;
`
