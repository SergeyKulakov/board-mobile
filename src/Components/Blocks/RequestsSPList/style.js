import styled from 'styled-components/native'
import { colors } from 'Themes'

export const CardWrapper = styled.View`
  margin-top: 20;
  margin-bottom: 10;
  padding-right: 10;
  padding-left: 10;
  padding-top: 10;
  padding-bottom: 10;
  box-shadow: 0 0 10px ${colors.disabledGray};
  elevation: 5;
  background-color: ${colors.white};
  min-height: ${p => (p.isBig ? 330 : 170)};
`

export const BannerWrapper = styled.View`
  margin-bottom: -15;
`
