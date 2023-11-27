import styled from 'styled-components/native'
import { colors } from 'Themes'
import { isIphoneX, isIos } from 'Helpers/iphoneX'

export const Container = styled.View`
  padding-top: ${isIphoneX() ? 40 : 10};
  flex: 1;
`

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin: 0 auto;
`

export const Title = styled.Text`
  font-size: 40;
  margin-top: 10;
  color: ${colors.white};
  font-weight: bold;
  text-align: center;
  align-self: flex-start;
`

export const Content = styled.View`
  justify-content: center;
  flex: 1;
  min-height: ${isIos() ? 450 : 500};
`

export const ScrollContent = styled.ScrollView`
  flex: 1;
`

export const FormContainer = styled.View`
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10;
  margin-bottom: 10;
  max-width: 500;
`

export const FooterContainer = styled.View`
  padding-top: 25;
  padding-bottom: 25;
  background: ${colors.white};
`
