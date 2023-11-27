import styled from 'styled-components/native'
import { space, flex, width } from 'styled-system'
import { colors, metrics } from 'Themes'

export const Container = styled.View`
  flex: 1;
  padding-top: 10;
`

export const BordererContainer = styled.View`
  padding-bottom: 15;
  border: solid 0 ${colors.frenchGray};
  border-bottom-width: 1;
  width: 100%;
`

export const Block = styled.View`
  width: 45%;
  ${space};
  ${flex};
  ${width};
`

export const Row = styled.View`
  ${space};
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 3%;
  padding-right: 3%;
  margin-top: 30;
`

export const AddressContainer = styled.View`
  padding-left: 3%;
  padding-right: 3%;
`

export const MapWrapperContainer = styled.View`
  margin-top: 20;
  margin-bottom: 5;
  width: 100%;
  min-height: 100;
  height: 200;
  overflow: hidden;
  padding-left: 3%;
  padding-right: 3%;
`
