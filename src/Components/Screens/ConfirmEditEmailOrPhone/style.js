import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'
import { flex } from 'styled-system'

export const Container = styled.View`
  flex: 1;
`

export const Content = styled.View`
  padding-top: 30;
  flex-direction: column;
  justify-content: center;
`

export const FormBlock = styled.View`
  flex-direction: column;
  margin-top: 40;
  padding-left: 2%;
  padding-right: 2%;
`

export const ButtonBlock = styled.View`
  margin-top: 20;
`

export const HeaderBlock = styled.View`
  flex-direction: row;
  align-items: center;
`

export const UserNameInfo = styled.Text`
  font-size: 18;
  color: ${colors.textGray};
  text-align: center;
`

export const Block = styled.View`
  flex: 1;
  ${flex};
`

export const ResentContainer = styled.View`
  padding-top: 30;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const ResentText = styled.Text`
  font-size: 18;
  color: ${colors.black};
  text-align: center;
  margin-bottom: 10;
`

export const styles = {
  ResentIcon: {
    name: 'refresh',
    size: 40,
    color: colors.blue,
  },
}
