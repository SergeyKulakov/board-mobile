import styled from 'styled-components/native'
import { ScreenTitle, BackIcon } from 'Components/UI'

export const Container = styled.View`
  flex-direction: column;
  padding-top: 5;
  padding-bottom: 5;
  width: 100%;
`

export const Top = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 10;
`

export const Left = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`

export const Middle = styled.View`
  flex: 6;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

export const Title = styled(ScreenTitle)`
  text-align: center;
`

export const TabsWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export const BackButton = styled(BackIcon)`
  margin-right: 15;
`
