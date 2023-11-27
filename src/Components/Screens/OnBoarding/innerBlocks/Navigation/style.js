import styled from 'styled-components/native'
import { Dimensions } from 'react-native'

import { colors } from 'Themes'

export const Container = styled.View`
  flex: 1;
  position: absolute;
  bottom: 15;
  width: ${Dimensions.get('window').width};
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

export const NavigationElement = styled.View`
  width: 30;
  height: 3;
  border-radius: 3;
  margin-left: 3;
  margin-right: 3;
  background-color: ${p => (p.active ? colors.white : colors.lightBlue)};
`
