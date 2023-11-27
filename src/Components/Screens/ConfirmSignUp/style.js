import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'
import { flex } from 'styled-system'

export const Container = styled.View`
  flex: 1;
`

export const Content = styled.View`
  padding-top: 50;
  flex-direction: column;
`

export const FormBlock = styled.View`
  flex-direction: column;
  margin-top: 10;
  padding-left: 2%;
  padding-right: 2%;
`

export const ButtonBlock = styled.View`
  margin-top: 20;
  flex-direction: column;
`

export const HeaderBlock = styled.View`
  flex-direction: row;
  align-items: center;
`

export const UserNameInfo = styled.Text`
  font-size: 18;
  color: ${colors.textGray};
  text-align: center;
  margin-bottom: 20;
`

export const Block = styled.View`
  flex: 1;
  ${flex};
`

export const ResendButtonContainer = styled.View`
  margin-bottom: 20;
`

export const EditableInputContainer = styled.View`
  margin-bottom: 20;
`

export const styles = {
  Title: {
    fontSize: 20,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
}
