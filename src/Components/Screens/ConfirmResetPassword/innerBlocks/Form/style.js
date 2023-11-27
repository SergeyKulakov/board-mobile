import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'
import { space } from 'styled-system'

export const Container = styled.View`
  padding-top: 5%;
  flex-direction: column;
  padding-left: 4%;
  padding-right: 4%;
`

export const InputContainer = styled.View`
  margin-top: 25;
  ${space};
`

export const ButtonContainer = styled.View`
  margin-top: 30;
  padding-left: 4%;
  padding-right: 4%;
`

export const UserNameText = styled.Text`
  text-align: center;
  color: ${colors.textGray};
  font-size: 20;
  margin-bottom: 10;
`
