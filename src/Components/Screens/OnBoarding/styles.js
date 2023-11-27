import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

export const ScrollBlockContainer = styled.View`
  position: relative;
  ${p =>
    !p.isSmall ? 'flex: 1' : `height: ${metrics.heightPercentageToDP(75)}`};
`

export const AutorizationContainer = styled.View`
  min-height: 170;
  background-color: ${colors.white};
`

export const Wrapper = styled.View`
  flex: 1;
`
