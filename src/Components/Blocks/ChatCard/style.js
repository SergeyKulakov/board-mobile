import styled from 'styled-components/native'
import { colors } from 'Themes'
import { ProviderPhoto } from 'Components/UI/ProviderPhoto'

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  elevation: 7;
  background-color: #fff;
  padding-top: 10;
  padding-bottom: 10;
  padding-right: 10;
  padding-left: 10;
`

export const AvatarWrapper = styled.View`
  margin-right: 5;
  min-width: 90;
`

export const Content = styled.View`
  flex-direction: column;
  flex: 1;
`

export const TopPart = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 10;
`

export const UserName = styled.Text`
  font-size: 16;
  font-weight: ${p => (p.isChatBlocked ? 'bold' : 'normal')};
  color: ${p =>
    p.isChatBlocked ? colors.locationModal.textGray : colors.blue};
  margin-right: 15;
`

export const LastDate = styled.Text`
  font-size: 15;
  font-weight: ${p => (p.isChatBlocked ? 'bold' : 'normal')};
  color: ${p =>
    p.isChatBlocked ? colors.locationModal.textGray : colors.blue};
`

export const NameWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`

export const LastMessage = styled.Text.attrs(() => ({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
}))`
  display: ${p => p.isVisible? 'flex' : 'none'};
  font-size: 15;
  color: ${colors.disabledGray};
`

export const Avatar = styled(ProviderPhoto)`
  width: 70;
  height: 70;
`
