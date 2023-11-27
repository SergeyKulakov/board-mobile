import styled from 'styled-components/native'
import { colors } from 'Themes'

import { ProviderPhoto } from 'Components/UI'

export const Wrapper = styled.View`
  flex-direction: column;
  align-items: center;
  width: 100%;
  align-self: center;
`

export const AvatarWrapper = styled.View`
  box-shadow: 0 0 10px ${colors.disabledGray};
  elevation: 7;
  overflow: hidden;
  width: 160;
  height: 160;
  border-radius: 100;
  margin-bottom: 10;
`

export const Avatar = styled(ProviderPhoto)`
  margin-bottom: 20;
  width: 160;
  height: 160;
  border-radius: 100;
`

export const Name = styled.Text`
  font-size: 25;
  color: #000;
  font-weight: bold;
  text-align: center;
`

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 10;
`

export const Reviews = styled.Text`
  font-size: 18;
  color: ${colors.blue};
`

const FooterWrapper = styled.View`
  width: 50%;
  padding-top: 5;
  padding-bottom: 5;
`

export const ReviewsWrapper = styled(FooterWrapper)`
  padding-left: 15;
`

export const RatingWrapper = styled(FooterWrapper)`
  padding-right: 10;
  border: solid 0 ${colors.disabledGray};
  border-right-width: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`
