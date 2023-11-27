import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'
import { Dimensions } from 'react-native'
import { isIphoneX, isIos } from 'Helpers/iphoneX'

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.athensGray};
`

export const ImageContainer = styled.View`
  flex: 1;
`

export const Header = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding-top: 10;
  padding-right: 10;
  ${isIos() && `padding-top: ${isIphoneX() ? 40 : 20}`}
`

export const styles = {
  SnapCarousel: {
    getSliderWidth: () => Dimensions.get('window').width,
    getItemWidth: () => metrics.widthPercentageToDP(90),
    containerCustomStyle: {
      paddingTop: 20,
      paddingBottom: 20,
    },
  },
  CloseIcon: {
    type: 'fe',
    name: 'x',
    size: 40,
    color: colors.disabledGray,
  },
}
