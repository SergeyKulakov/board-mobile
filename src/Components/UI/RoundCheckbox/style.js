import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Wrapper = styled.View`
  background-color: #fff;
  border: solid 1px ${colors.disabledGray};
  padding-top: 5;
  padding-right: 5;
  padding-left: 5;
  padding-bottom: 5;
  border-radius: 15;
`

export const Dot = styled.View`
  background-color: ${colors.blue};
  width: 15;
  height: 15;
  border-radius: 8;
  opacity: ${p => (p.isActive ? 1 : 0)};
`
