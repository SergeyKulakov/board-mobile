import styled from 'styled-components/native'
import { isIos } from 'Helpers/iphoneX'
import { ScreenTitle } from 'Components/UI'

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding-top: 5;
  padding-bottom: 5;
`

export const Middle = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 10;
  justify-content: flex-start;
  ${isIos() && 'padding-top: 5'};
`

export const LeftButtonsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`
export const BackIconWrapper = styled.View`
  margin-right: 15;
`

export const Title = styled(ScreenTitle)``
