import styled from 'styled-components/native'
import { colors } from 'Themes'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.zircon};
`

export const RowWrapper = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-top: 5;
  margin-bottom: 5;
  width: 90%;
`

export const RowText = styled.Text`
  font-size: 18;
  color: ${colors.black};
  margin-left: 25;
`

export const ListHeader = styled.View`
  flex-direction: column;
  margin-bottom: 30;
`

export const Title = styled.Text`
  font-size: 20;
  color: ${colors.black};
  font-weight: bold;
  margin-bottom: 15;
`

export const SubTitle = styled.Text`
  font-size: 16;
  color: ${colors.textGray};
`

export const InputWrapper = styled.View`
  margin-top: 20;
  padding-bottom: 40;
`

export const ButtonWrapper = styled.View`
  width: 100%;
`

export const List = styled(KeyboardAwareFlatList)`
  padding-top: 25;
  padding-left: 4%;
  padding-right: 4%;
`
