import styled from 'styled-components/native'
import { width, space, flex } from 'styled-system'

export const Container = styled.View`
  padding-top: 5%;
  padding-bottom: 5%;
  max-width: 600;
`

export const RowBlock = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30;
`

export const RowItem = styled.View`
  width: 45%;
  margin-right: 5%;
  ${width};
  ${space};
  ${flex};
`

export const GeolocationInfoBlock = styled.View`
  padding-top: 30;
`

export const LocationImageContainer = styled.View`
  padding-top: 20;
  width: 100%;
  min-height: 100;
  height: 200;
  overflow: hidden;
`
