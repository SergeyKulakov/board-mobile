import styled from 'styled-components/native'

import { colors } from 'Themes'

export const Container = styled.View`
  flex: 2;
  padding-top: 5%;
  width: 90%;
  max-width: 400;
  margin: 0 auto;
  flex-direction: column;
  justify-content: flex-start;
`

export const Text = styled.Text`
  color: ${colors.textGray};
  text-align: center;
  margin-bottom: 2%;
`

export const SingInBlock = styled.View`
  padding-top: 5%;
  justify-content: flex-start;
  align-items: center;
`

export const Link = styled.Text`
  color: ${colors.blue};
  font-weight: bold;
`

export const SingInTextContainer = styled.View`
  flex-direction: row;
  margin-bottom: 5;
`
