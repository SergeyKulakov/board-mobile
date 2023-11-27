import styled from 'styled-components/native'
import { colors } from 'Themes'
import { isIos } from 'Helpers/iphoneX'

export const ItemContainer = styled.View`
  flex: 1;
  margin-top: 10;
  position: relative;
  background-color: #fff;
  box-shadow: 0 0 10px ${colors.disabledGray};
  elevation: 7;
  margin-bottom: 5;
`

export const SliderAdvertisingBlock = styled.View`
  padding-top: 3;
`

export const ActionsContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10;
  ${!isIos() && 'margin-bottom: 5'};
`
