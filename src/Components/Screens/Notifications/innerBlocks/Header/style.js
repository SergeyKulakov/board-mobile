import styled from 'styled-components/native'
import { BackIcon, ScreenTitle } from 'Components/UI'

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding-top: 5;
  padding-bottom: 5;
`

export const BackButton = styled(BackIcon)`
  margin-right: 15;
`

export const Title = styled(ScreenTitle)`
  margin-left: 25;
`
