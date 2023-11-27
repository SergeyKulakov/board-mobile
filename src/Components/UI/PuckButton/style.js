import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Container = styled.TouchableOpacity`
  padding-vertical: 5;
  padding-horizontal: 10;
  ${p =>
    p.outline ? 'border: solid 1px #fff' : `background-color: ${colors.blue}`};
  border-radius: 10;
`

export const Text = styled.Text`
  font-size: 18;
  color: ${p => (p.outline ? colors.black : colors.white)};
`
