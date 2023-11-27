import styled from 'styled-components/native'
import { colors } from 'Themes'
import { ScreenTitle, BackIcon, Icon } from 'Components/UI'

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 5;
  padding-bottom: 5;
`

export const BackButton = styled(BackIcon)`
  margin-right: 15;
`

export const Title = styled(ScreenTitle)`
  margin-left: 20;
  margin-right: 10;
`

export const Right = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`

export const TitleWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`

export const IconWrapper = styled.View`
  min-width: 70;
  flex-direction: row;
  justify-content: flex-end;
`

export const LockUserIcon = styled(Icon).attrs(() =>({
  name: 'deleteuser',
  type: 'ant',
  size: 25,
  color: colors.white,
}))``

export const LockUserIconBlack = styled(LockUserIcon).attrs(() => ({
  color: colors.black,
}))``

export const LockUserIconRed = styled(LockUserIcon).attrs(() => ({
  color: colors.red,
}))``

