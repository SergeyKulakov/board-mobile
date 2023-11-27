import styled from 'styled-components/native'
import { ScreenTitle } from 'Components/UI'

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Left = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: row;
`

export const Middle = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  flex: 5;
`

export const Title = styled(ScreenTitle)`
  text-align: center;
`
