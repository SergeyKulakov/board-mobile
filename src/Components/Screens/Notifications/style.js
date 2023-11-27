import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Container = styled.View`
  flex: 1;
`

export const Content = styled.View`
  flex: 1;
`

export const TopPathWrapper = styled.View`
  flex-direction: column;
`

export const MarkAsText = styled.Text`
  margin-top: 10;
  font-size: 16;
  align-self: flex-end;
  text-align: right;
  font-weight: bold;
  color: #000;
  margin-right: 15;
`

export const NotificationCardWrapper = styled.TouchableOpacity`
  box-shadow: 0 0 10px ${colors.disabledGray};
  padding-left: 10;
  padding-right: 10;
`
