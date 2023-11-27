import styled from 'styled-components/native'
import { Icon as UIIcon } from '../Icon'

export const Container = styled.View`
  padding-top: 5;
  padding-left: 7;
  padding-right: 7;
  padding-bottom: 5;
  border-radius: 20;
  background-color: purple;
`

export const Icon = styled(UIIcon).attrs(() => ({
  name: 'award',
  type: 'fa5',
  color: '#fff',
  size: 15,
}))``
