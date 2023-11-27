import styled from 'styled-components/native'
import { ScreenTitle } from 'Components/UI'

export const Container = styled.View`
  padding-top: 5;
  padding-bottom: 5;
  margin-bottom: 0;
  flex: 1;
  flex-direction: row;
  align-items: center;
`

export const Left = styled.View`
  flex: 1;
`

export const Middle = styled.View`
  flex: 5;
`

export const Title = styled(ScreenTitle)`
  font-size: 22;
  text-align: center;
`
