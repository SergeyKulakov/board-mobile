import styled from 'styled-components/native'
import { View as AnimateView } from 'react-native-animatable'

export const Container = styled.View`
  flex: 1;
  position: relative;
`

export const MapSliderBlock = styled.View`
  width: 100%;
  min-height: ${p => (p.isHelpCard ? 340 : 220)};
`

export const SliderItemWrapper = styled.View`
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  flex: 1;
`

export const style = {
  flex: 1,
}
