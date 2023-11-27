import React from 'react'
import styled from 'styled-components/native'
import { colors } from 'Themes'
import { StarsIcon as UIStarsIcon, Icon } from 'Components/UI'

export const RemoveIcon = styled(Icon).attrs(() => ({
  name: 'times',
  color: colors.textGray,
  size: 15,
}))`
  margin-left: 10;
  margin-top: -5;
`

export const Container = styled.View`
  padding-top: 5;
  elevation: 5;
  overflow: hidden;
  flex-direction: column;
  background-color: #fff;
`

export const Content = styled.View`
  flex-direction: row;
  padding-top: 5;
  padding-left: 10;
  padding-right: 10;
  margin-bottom: 20;
`

export const AvatarWrapper = styled.View`
  margin-right: 10;
  margin-top: 10;
`

export const DescriptionWrapper = styled.View`
  flex-direction: column;
  justify-content: center;
  flex: 1;
`

export const UserName = styled.Text`
  font-size: 16;
  color: ${colors.textGray};
  margin-bottom: 5;
`

export const ServiceText = styled.Text`
  font-size: 16;
  color: ${colors.lightGray};
`

export const Stars = styled(props => <UIStarsIcon {...props} />)`
  margin-bottom: 5;
`

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-right: 10;
`
