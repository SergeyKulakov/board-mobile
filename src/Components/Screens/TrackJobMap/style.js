import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Container = styled.View`
  flex: 1;
`

export const Content = styled.View`
  flex: 1;
`

export const LoadingWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const PermissionErrorText = styled.Text`
  font-size: 20;
  color: #000;
  margin-bottom: 10;
  text-align: center;
  padding-horizontal: 20;
`

export const Loader = styled.ActivityIndicator.attrs(() => ({
  size: 'large',
  color: colors.blue,
}))``

export const Message = styled.Text`
  margin-top: 10;
  text-align: center;
  color: ${colors.textGray};
  font-size: 18;
  font-weight: bold;
`
