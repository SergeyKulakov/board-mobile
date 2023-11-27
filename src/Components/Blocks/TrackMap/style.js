import styled from 'styled-components/native'
import { colors } from 'Themes'
import GoogleMap from 'react-native-maps'

export const Map = styled(GoogleMap)`
  flex: 1;
`

export const Label = styled.Text`
  font-size: 16;
  color: ${colors.white};
`
