import styled from 'styled-components/native'

import { ScreenTitle, BackIcon } from 'Components/UI'

export const Container = styled.View`
  padding-top: 5;
  flex-direction: column;
  width: 100%;
`

export const Left = styled.View`
  align-items: center;
  flex-direction: row;
`

export const Middle = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: center;
  flex: 5;
`

export const BackButton = styled(BackIcon)`
  margin-right: 10;
`

export const Title = styled(ScreenTitle)`
  font-size: 20;
  text-align: center;
`

export const Top = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`

export const Tabs = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-bottom: 5;
  padding-top: 10;
`
