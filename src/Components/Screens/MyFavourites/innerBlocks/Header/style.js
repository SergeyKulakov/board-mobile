import styled from 'styled-components/native'
import { ScreenTitle } from 'Components/UI'

export const Container = styled.View`
  flex-direction: column;
  padding-bottom: 5;
  padding-top: 5;
  width: 100%;
`

export const Left = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

export const Middle = styled.View`
  flex: 5;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const Right = styled.View`
  flex: 1;
`

export const Top = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 10;
`

export const BackIconWrapper = styled.View`
  margin-right: 15;
`

export const Title = styled(ScreenTitle)`
  text-align: center;
`

export const TabsWrapper = styled.View`
  margin-top: 5;
  margin-bottom: 5;
  flex-direction: row;
  justify-content: center;
`
