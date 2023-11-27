import styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import { colors, metrics } from 'Themes'

export const AdMobBannerWrapper = styled.TouchableWithoutFeedback`
  width: ${metrics.screenWidth};
`

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 10;
  padding-right: 10;
  padding-bottom: 5;
  padding-top: 5;
  box-shadow: 0 0 5px ${colors.disabledGray};
  elevation: 5;
  margin-bottom: 10;
  margin-top: 10;
  background-color: #fff;
  border-radius: 5;
  margin-left: 5;
  margin-right: 5;
`

export const Image = styled.Image`
  width: 60;
  height: 60;
  background-color: ${colors.lightBlue};
  margin-right: 10;
`

export const AdmobBanner = styled.ImageBackground.attrs(() => ({
  resizeMode: 'contain',
}))`
  width: ${metrics.screenWidth};
  min-height: 80;
  justify-content: center;
  align-items: center;
`

export const BannerText = styled.Text`
  max-width: 80%;
  position: relative;
  left: 20;
  text-align: center;
  font-size: 16;
  color: #fff;
  font-weight: bold;
`

export const Title = styled.Text.attrs(() => ({
  numberOfLines: 2,
  ellipsizeMode: 'tail',
}))`
  font-size: 16;
  color: ${colors.black};
  font-weight: bold;
  margin-bottom: 0;
  padding-bottom: 0;
`

export const TextWrapper = styled.View`
  flex-direction: column;
  margin-right: 5;
  width: 100;
`

export const SubTitle = styled.Text`
  font-size: 14;
  color: ${colors.black};
  font-weight: bold;
  margin-top: 0;
  padding-top: 0;
`

export const AddText = styled.Text`
  font-size: 18;
  color: ${colors.disabledGray};
  align-self: flex-start;
`

export const SnapCarouselContainer = styled.View`
  overflow: hidden;
  max-height: 200;
`

export const styles = {
  Button: {
    container: {
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 10,
      paddingRight: 10,
    },
    bgColor: colors.blue,
    borderRadius: 5,
  },
  SnapCarousel: {
    getSliderWidth: () => Dimensions.get('window').width,
    getItemWidth: () =>
      Dimensions.get('window').width < 500
        ? metrics.widthPercentageToDP(95)
        : 450,
    containerCustomStyle: {
      paddingTop: 10,
      paddingBottom: 10,
    },
  },
  ShadowBox: {
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
}
