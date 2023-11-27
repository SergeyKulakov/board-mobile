import styled from 'styled-components/native'
import { space } from 'styled-system'
import { colors } from 'Themes'

export const Container = styled.View`
  background-color: ${colors.white};
  border-radius: 10;
  padding-top: 10;
  padding-bottom: 5;
  padding-left: 5;
  padding-right: 5;
`

export const ButtonContainer = styled.View`
  margin-top: 4%;
  margin-bottom: 2%;
  align-self: center;
  width: 95%;
`

export const ForgotLink = styled.Text`
  align-self: center;
  color: ${colors.textGray};
  margin-top: 2%;
  margin-bottom: 2%;
`

export const InputContainer = styled.View`
  padding-top: 15;
  ${space}
`

export const FormContainer = styled.View`
  flex-direction: column;
  margin-left: 2%;
  padding-right: 2%;
`

export const CheckBoxContainer = styled.View`
  margin-top: 5%;
  margin-bottom: 6%;
`
