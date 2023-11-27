import styled from 'styled-components/native'
import { colors } from 'Themes'
import { Icon as icon } from '../../Icon'

export const Icon = styled(icon).attrs(() => ({
  type: 'mci',
  name: 'crown',
  size: 17,
  color: colors.white,
}))`
  overflow: hidden;
  padding-top: 4;
  padding-left: 4;
  padding-right: 4;
  padding-bottom: 4;
  justify-content: center;
  align-items: center;
  border-radius: 15;
  background-color: ${colors.amber};
`
