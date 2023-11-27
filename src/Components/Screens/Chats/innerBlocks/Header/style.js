import styled from 'styled-components/native'
import { ScreenTitle, BackIcon } from 'Components/UI'

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 5;
`

export const BackButton = styled(BackIcon)`
  margin-right: 15;
`

export const Title = styled(ScreenTitle)`
  margin-left: 20;
`
