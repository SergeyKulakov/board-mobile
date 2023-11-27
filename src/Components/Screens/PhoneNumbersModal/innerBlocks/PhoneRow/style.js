import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-horizontal: 10;
  align-self: center;
  padding-vertical: 7;
  border: solid 0 rgba(192, 192, 192, 0.6);
  border-bottom-width: 1;
`

export const Text = styled.Text`
  font-size: 18;
  color: ${p => (p.isActive ? colors.blue : colors.textGray)};
  flex: 4;
  flex-wrap: wrap;
`

export const TextNumber = styled(Text)`
  font-weight: bold;
  margin-right: 7;
`

export const Right = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 2;
`
