import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Wrapper = styled.ScrollView`
  flex: 1;
`

export const ListContainer = styled.View`
  margin-top: 20;
  flex: 1;
`

export const LogOutText = styled.Text`
  font-size: 18;
  color: ${colors.disabledGray};
  padding-left: 20;
  padding-top: 20;
  padding-bottom: 30;
`
