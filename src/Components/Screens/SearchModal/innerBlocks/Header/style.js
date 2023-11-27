import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  padding-top: 5;
`

export const Left = styled.View`
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  flex: 1;
`

export const Middle = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex: 5;
`

export const InputSearchWrapper = styled.View`
  flex: 1;
`

export const Right = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 2;
  justify-content: center;
`

export const SearchText = styled.Text`
  font-size: 16;
  color: ${colors.white};
  margin-left: 15;
  text-align: center;
`
