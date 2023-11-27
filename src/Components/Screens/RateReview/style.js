import styled from 'styled-components/native'
import { colors } from 'Themes'
import { isIos } from 'Helpers/iphoneX'

export const Container = styled.View`
  flex: 1;
`

export const RateWrapper = styled.View`
  flex-direction: column;
  background-color: #fff;
  border-radius: 10;
  box-shadow: 0 0 8px ${colors.disabledGray};
  elevation: 5;
  padding-top: 60;
  margin-top: ${isIos() ? 40 : -50};
`

export const FeedbackWrapper = styled(RateWrapper)`
  margin-top: 10;
  padding-left: 10;
  padding-right: 10;
  padding-top: 0;
`

export const Section = styled.View`
  flex-direction: column;
  align-items: center;
  position: relative;
`

export const ProviderPhotoWrapper = styled.View`
  ${isIos() && 'position: absolute'};
  width: 100%;
  flex-direction: row;
  justify-content: center;
  ${isIos() && 'top: -40'};
`

export const ProfileName = styled.Text`
  font-size: 18;
  color: ${colors.black};
  font-weight: bold;
  text-align: center;
`

export const RatingSliderWrapper = styled.View`
  padding-top: 30;
  padding-left: 15;
  padding-right: 15;
  padding-bottom: 10;
  margin-bottom: 15;
`

export const Label = styled.Text`
  margin-top: 10;
  font-size: 18;
  color: ${colors.black};
  font-weight: bold;
`

export const InputBlockWrapper = styled.View`
  margin-bottom: 20;
`

export const ButtonWrapper = styled.View`
  padding-left: 10;
  padding-right: 10;
  padding-bottom: 15;
  margin-top: 15;
`
