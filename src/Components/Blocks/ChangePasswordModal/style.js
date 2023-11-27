import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Container = styled.View`
  background-color: #fff;
  position: absolute;
  flex: 1;
  top: 10%;
  overflow: hidden;
`

export const TitleWrapper = styled.View`
  padding-top: 15;
  padding-bottom: 30;
  margin-bottom: 30;
  width: 100%;
  border: solid 0 ${colors.athensGray};
  border-bottom-width: 1;
`

export const Title = styled.Text`
  width: 100%;
  text-align: center;
  font-size: 20;
  color: ${colors.black};
  font-weight: bold;
`

export const Content = styled.View`
  margin-top: 10;
`

export const InfoText = styled.Text`
  padding-bottom: 20;
  font-size: 18;
  color: ${colors.textGray};
  text-align: center;
  padding-left: 10;
  padding-right: 10;
`

export const InputWrapper = styled.View`
  padding-left: 5;
  padding-right: 5;
`

export const ButtonsWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  margin-top: 10;
`

export const Overlay = styled.View`
  flex: 1;
  background: rgba(0, 0, 0, 0.5);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 2%;
  padding-right: 2%;
`

export const ForgotPasswordLinkWrapper = styled.TouchableWithoutFeedback`
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
`

export const ForgotPasswordLink = styled.Text`
  font-size: 16;
  color: ${colors.blue};
  text-align: right;
  margin-top: 10;
  margin-bottom: 5;
`

export const buttons = {
  default: {
    width: '50%',
  },
  success: {
    container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
    },
  },
  cancel: {
    start: colors.addServiceBtn.start,
    end: colors.addServiceBtn.end,
  },
}
