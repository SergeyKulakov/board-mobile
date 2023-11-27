import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding-left: 10;
  padding-right: 10;
  padding-top: 10;
  padding-bottom: 10;
  border: solid 0 ${p => (p.isActive ? colors.lightBlue : colors.frenchGray)};
  border-bottom-width: 1;
`

const text = styled.Text`
  font-size: 18;
  color: ${colors.textGray};
`

export const LeftText = styled(text)``

export const RightText = styled(text)`
  font-weight: bold;
`
