import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Container = styled.View``

export const Text = styled.Text`
  font-size: 20;
  color: ${p => (p.isActive ? colors.black : colors.disabledGray)};
`

export const Label = styled.Text`
  font-size: 16;
  color: ${colors.textGray};
  margin-bottom: 15;
  opacity: ${p => (p.isActive ? 1 : 0)};
`

export const Content = styled.View`
  border: 0 solid ${p => (p.error ? colors.red : colors.disabledGray)};
  border-bottom-width: ${p => (p.isActive ? '2px' : '1px')};
  padding-bottom: 15;
`
