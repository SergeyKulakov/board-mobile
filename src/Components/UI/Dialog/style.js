import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Container = styled.View`
  position: absolute;
  top: -10;
  right: 40;
  background-color: ${colors.white};
  border-radius: 5;
  width: 150;
  box-shadow: 0 0 5px ${colors.lightGray};
  elevation: 2;
`

export const Text = styled.Text`
  font-size: ${p => (p.isSmall ? 16 : 20)};
  color: ${colors.textGray};
  padding-left: 10;
`

export const Button = styled.View`
  padding-top: ${p => (p.isSmall ? 5 : 10)};
  padding-bottom: ${p => (p.isSmall ? 5 : 10)};
  padding-left: 15;
  padding-right: 15;
  flex-direction: row;
  align-items: center;
`
