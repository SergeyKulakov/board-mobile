import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'

import { ProviderPhoto, Dialog } from 'Components/UI'

export const Container = styled.View`
  padding-top: 10;
  padding-right: 10;
  padding-left: 10;
  padding-bottom: 10;
  border-radius: 10;
  background-color: #fff;
  flex-direction: column;
`

export const Header = styled.View`
  flex-direction: row;
`

export const Avatar = styled(ProviderPhoto)`
  width: 80;
  height: 80;
  margin-right: 10;
`

export const HeaderColumn = styled.View`
  flex-direction: column;
`

export const NameRow = styled.View`
  flex-direction: row;
  align-items: center;
  width: ${metrics.screenWidth - 40};
  margin-bottom: 7;
`

export const Name = styled.Text.attrs(() => ({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
}))`
  font-size: 18;
  color: #000;
  font-weight: bold;
`

export const ServicesContainer = styled.View`
  margin-top: 7;
  border-radius: 10;
  padding-left: 10;
  padding-right: 10;
  background-color: ${colors.amber};
  align-self: flex-start;
  max-width: 70%;
`

export const ServiceText = styled.Text`
  font-size: 15;
  color: ${colors.white};
  font-weight: bold;
`

export const PopupWrapper = styled.View`
  margin-left: auto;
  position: relative;
  min-width: 15;
`

export const Content = styled.View`
  flex-direction: column;
`

export const Comment = styled.Text`
  color: ${colors.textGray};
  font-size: 18;
  margin-top: 20;
  margin-bottom: 20;
`

export const CreatedAt = styled.Text`
  font-size: 16;
  color: ${colors.textGray};
`

export const Popup = styled(Dialog)`
  top: -5;
  right: 10;
`
