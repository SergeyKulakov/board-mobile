import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.white};
  border-radius: 10;
  box-shadow: 0 0 5px ${colors.disabledGray};
  max-height: 35;
  width: 100%;
  max-width: 100%;
`

export const Input = styled.TextInput`
  font-size: 20;
  color: ${colors.textGray};
  flex: 1;
  align-items: center;
  padding-top: 2;
  padding-bottom: 2;
`

export const IconContainer = styled.View`
  padding-right: 10;
  padding-left: 5;
`
