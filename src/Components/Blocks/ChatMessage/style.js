import styled from 'styled-components/native'
import { colors } from 'Themes'
// import Slider from '@react-native-community/slider'
import { GradientContainer, ProviderPhoto, Icon } from 'Components/UI'
import { isIos } from 'Helpers/iphoneX'

export const Container = styled.View`
  flex-direction: ${p => (p.isReverse ? 'row-reverse' : 'row')};
  align-items: flex-end;
  padding-left: 5;
  padding-right: 5;
  box-shadow: 0 0 5px ${colors.disabledGray};
`

export const Avatar = styled(ProviderPhoto)`
  width: 60;
  height: 60;
  min-width: 60;
  ${!isIos() && 'margin-bottom: 10'};
`

export const MessageWrapper = styled(GradientContainer).attrs(props => ({
  gradient: props.isReverse
    ? {
        start: colors.pattensBlue,
        end: colors.frenchPass,
      }
    : {
        start: colors.gradientStart,
        end: colors.gradientEnd,
      },
}))`
  padding-top: 10;
  padding-left: 10;
  padding-right: 10;
  padding-bottom: 10;
  ${p => (p.isReverse ? 'margin-right' : 'margin-left')}: 5;
  flex: 1;
  elevation: 2;
  flex-direction: column;
  border-top-right-radius: 10;
  border-top-left-radius: 10;
  ${p =>
    p.isReverse
      ? 'border-bottom-left-radius'
      : 'border-bottom-right-radius'}: 10;
  ${!isIos() && 'margin-bottom: 10'};
`

export const MessageText = styled.Text`
  color: ${p => (p.isReverse ? colors.textGray : colors.white)};
  font-size: 18;
  margin-bottom: 5;
`

export const Date = styled.Text`
  font-size: 14;
  color: ${p => (p.isReverse ? colors.textGray : colors.white)};
  font-weight: bold;
  align-self: flex-end;
  text-align: right;
`

export const MessageVoiceWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  width: 80%;
  height: 30;
  overflow: hidden;
`

export const DefaultIcon = styled(Icon).attrs(() => ({
  size: 30,
  color: colors.black,
}))`
  margin-right: 5%;
`

export const PlayIcon = styled(DefaultIcon).attrs(() => ({
  name: 'play-circle',
}))``

export const PauseIcon = styled(DefaultIcon).attrs(() => ({
  name: 'pause-circle',
}))``

// export const CustomSlider = styled(Slider).attrs(() => ({
//   minimumTrackTintColor: colors.white,
//   maximumTrackTintColor: colors.disabledGray,
//   thumbTintColor: colors.black
// }))`
//   width: 80%;
//   height: 5;
// `

export const ManualSliderWrapper = styled.View`
  width: 80%;
  height: 5;
  background-color: ${colors.disabledGray};
`

export const ManualSlider = styled.View`
  width: ${p => p.width + '%'};
  height: 5;
  background-color: ${colors.white};
`
