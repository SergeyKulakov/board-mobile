import styled from 'styled-components/native'
import { colors } from 'Themes'
import { Icon as UIIcon } from 'Components/UI'

export const Container = styled.View`
  background-color: #fff;
  margin-top: 10;
  margin-bottom: 10;
  padding-top: 5;
  padding-left: 10;
  padding-right: 10;
  padding-bottom: 5;
  border-radius: 10;
  flex-direction: row;
  align-items: center;
  elevation: 7;
`

export const ImageWrapper = styled.View`
  margin-right: 10;
  flex-basis: 28%;
`

export const Content = styled.View`
  flex-direction: column;
  flex-basis: ${p => (p.isRead ? 72 : 62)}%;
  margin-bottom: 5;
`

export const DateWrapper = styled.View`
  flex-direction: row;
  align-items: flex-end;
`

export const DateText = styled.Text`
  font-weight: ${p => (p.isBold ? 'bold' : 'normal')};
  font-size: ${p => (p.isBold ? 15 : 14)};
  color: ${colors.disabledGray};
  margin-right: 2;
`

export const IconWrapper = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50;
  flex-basis: 10%;
`

export const ImageContainer = styled.View`
  width: 90;
  height: 90;
`

export const JobImageWrapper = styled.View`
  flex: 1;
  border-radius: 15;
  overflow: hidden;
`

export const Icon = styled(UIIcon).attrs(() => ({
  type: 'mci',
  name: 'circle-medium',
  color: colors.red,
}))``
