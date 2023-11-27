import styled from 'styled-components/native'
import { colors } from 'Themes'
import { StarsIcon as UIStarsIcon } from '../IconsInfo'
import { isIos } from 'Helpers/iphoneX'

export const Container = styled.View`
  flex-direction: row;
`

export const LineWrapper = styled.View`
  flex-direction: column;
  align-items: center;
  flex-basis: 20%;
`

export const StarsIcon = styled(UIStarsIcon)`
  margin-bottom: 15;
`

export const SectionLine = styled.View`
  background-color: ${p => p.color || colors.red};
  height: 5;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const Circle = styled.View`
  width: 30;
  height: 30;
  border-radius: 15;
  background-color: ${colors.blue};
  ${!isIos() && 'margin-top: -16'};
`
