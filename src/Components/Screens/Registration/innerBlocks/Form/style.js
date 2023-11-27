import styled from 'styled-components/native'
import { width, space, flex } from 'styled-system'
import { colors, metrics } from 'Themes'

export const Container = styled.View`
  background-color: ${colors.white};
`

export const Block = styled.View`
  width: 100%;
  padding-top: 30;
  ${width};
  ${space};
`
