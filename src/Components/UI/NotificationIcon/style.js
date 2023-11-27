import styled from 'styled-components/native'
import { colors } from 'Themes'

import IonicIcon from 'react-native-vector-icons/Ionicons'

export const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: 60;
  box-shadow: 0 0 5px ${colors.frenchGray};
  elevation: 4;
  background-color: ${colors.lightBlue};
`

export const Icon = styled(IonicIcon).attrs(() => ({
  color: '#fff',
  size: 45,
  name: 'md-notifications-outline',
}))``
