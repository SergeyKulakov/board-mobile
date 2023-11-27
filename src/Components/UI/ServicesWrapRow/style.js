import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`

export const TextWrapper = styled.View`
  padding-top: 3;
  padding-bottom: 3;
  padding-left: 10;
  padding-right: 10;
  background-color: ${colors.amber};
  border-radius: 20;
  margin-right: 15;
  margin-bottom: 7;
  margin-top: 7;
`

export const Text = styled.Text`
  font-weight: bold;
  color: ${colors.white};
  font-size: 16;
`
