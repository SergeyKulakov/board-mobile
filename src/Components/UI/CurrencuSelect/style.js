import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Container = styled.TouchableOpacity`
  min-width: 60;
  height: 100%;
  border: solid 0 ${colors.disabledGray};
  border-bottom-width: 1;
`

export const Currency = styled.Text`
  padding-top: 20;
  padding-bottom: 8;
  font-size: 20;
  font-weight: bold;
  color: ${colors.textGray};
  text-align: center;
`
