import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'

export const Container = styled.View`
  justify-content: center;
  width: 100%;
  flex-direction: row;
`

export const Content = styled.View`
  color: ${colors.black};
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex: 4;
`

export const Text = styled.Text`
  font-size: 18;
  text-align: center;
  color: ${p => (p.isActive ? colors.blue : colors.textGray)};
  opacity: ${p => (p.isActive ? 1 : 0.7)};
  padding-left: 10;
  flex-direction: row;
  flex-wrap: nowrap;
`

export const Block = styled.View`
  flex: ${p => (p.isLeft ? 2 : 1)};
`
