import styled from 'styled-components/native'
import { ScreenTitle, BackIcon as UIBackIcon } from 'Components/UI'

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 5;
  padding-bottom: 5;
`

export const Block = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`

export const Middle = styled.View`
  flex: 4;
  justify-content: center;
`

export const Title = styled(ScreenTitle)`
  text-align: center;
`

export const BackIcon = styled(UIBackIcon)`
  margin-right: 15;
`
