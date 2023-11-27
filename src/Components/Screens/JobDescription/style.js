import styled from 'styled-components/native'
import { colors } from 'Themes'
import { ShadowBox, Icon } from 'Components/UI'
import { space, minHeight } from 'styled-system'
import { isIos } from 'Helpers/iphoneX'
import LinearGradient from 'react-native-linear-gradient'

const acceptGradient = {
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
  colors: [colors.funGreen, colors.jade],
}
const rejectGradient = {
  start: { x: 1, y: 0 },
  end: { x: 0, y: 0 },
  colors: [colors.brightRed, colors.red],
}

export const Container = styled.View`
  flex: 1;
`

export const Block = styled.View`
  ${space};
  ${minHeight};
`

export const LinkPreviewWrapper = styled(ShadowBox)`
  min-height: 200;
  padding-right: 15;
  padding-left: 15;
  padding-top: 0;
  padding-bottom: 0;
  margin: 0;
`

export const JobDescriptionWrapper = styled(ShadowBox)`
  padding: 0;
  margin: 0;
  margin-top: 10;
  min-height: ${p => (p.isLong ? 250 : 130)};
`

export const BookedActions = styled.View`
  flex-direction: column;
  margin-top: 20;
`

export const IconButtonsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20;
`

export const ActionWrapper = styled.TouchableOpacity`
  flex-basis: 50%;
  flex-direction: column;
  align-items: center;
  opacity: ${p => (p.disabled ? 0.4 : 1)};
`

export const SubmitButtonWrapper = styled.View`
  margin-bottom: 10;
`

export const ShadowButtonWrapper = styled.View`
  box-shadow: 0 0 10px ${colors.disabledGray};
`

export const BordererActionWrapper = styled(ActionWrapper)`
  border: solid 0 ${colors.lightGray02};
  border-right-width: 1;
`

export const CalendarIcon = styled(Icon).attrs(() => ({
  type: 'foundation',
  name: 'calendar',
  size: 60,
  color: colors.black,
}))``

export const PinIcon = styled(Icon).attrs(() => ({
  type: 'evil',
  name: 'location',
  size: 60,
  color: colors.black,
}))`
  margin-top: 10;
`

export const ActionText = styled.Text`
  text-align: center;
  font-size: 16;
  color: ${colors.blue};
`

export const ActionsWrapper = styled.View`
  flex-direction: column;
`

export const RequestsWrapper = styled.View`
  flex-direction: row;
  width: 100%;
`

export const GradientContainer = styled(LinearGradient).attrs(props =>
  props.isRed ? rejectGradient : acceptGradient,
)`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const ButtonText = styled.Text`
  font-size: 18;
  color: #fff;
  font-weight: bold;
  text-align: center;
`

export const ButtonWrapper = styled.TouchableOpacity`
  min-width: 50%;
  min-height: 50;
`

export const RequestLoaderWrapper = styled.View`
  min-height: 50;
  justify-content: center;
  align-items: center;
`

export const Loader = styled.ActivityIndicator``

export const CancelButtonWrapper = styled.View`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  /* max-width: 500; */
  margin-top: 10;
`

export const SliderAdvertisingWrapper = styled.View``

export const InfoBlockWrapper = styled.View`
  min-height: ${p => (p.isLong ? 280 : 130)};
`

export const ButtonsWrapper = styled.View`
  margin-top: 10;
`

export const styles = {
  ShadowBox: {
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
    paddingBottom: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  ImagesContainer: {
    minHeight: 180,
    marginBottom: 0,
  },
  CustomerInfo: {
    minHeight: 150,
  },
  InfoBlock: {
    minHeight: 150,
  },
  PeopleList: {
    paddingTop: 15,
    paddingRight: 0,
    paddingLeft: 0,
    paddingBottom: 0,
    minHeight: 220,
    marginBottom: 0,
  },
  Button: {
    bgColor: colors.white,
  },
  RateButton: {
    bgColor: isIos() ? colors.white : colors.athensGray,
  },
  CancelButton: {
    style: {
      gradient: {
        start: colors.addServiceBtn.disabled.end,
        end: colors.addServiceBtn.disabled.start,
      },
    },
  },
}
