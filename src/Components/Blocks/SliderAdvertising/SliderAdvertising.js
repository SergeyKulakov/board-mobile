import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SnapCarousel from 'react-native-snap-carousel'
import { Button } from 'Components/UI'
import { ads } from 'Assets/images/Icons'
import { appBanner } from 'Assets/images'

import { ActivityIndicator } from 'react-native'

import {
  AdMobBannerWrapper,
  Container,
  Title,
  AddText,
  Image,
  SnapCarouselContainer,
  TextWrapper,
  SubTitle,
  AdmobBanner,
  BannerText,
  styles,
} from './style'

class SliderAdvertising extends Component {
  renderItem = ({ item }) => {
    const { t, onClick } = this.props

    return (
      <Container>
        <Image source={item.image} />
        <TextWrapper>
          <Title>{t(item.title)}</Title>
          <SubTitle>atomxllc.com</SubTitle>
        </TextWrapper>
        <Button
          style={styles.Button}
          linear={styles.Button.borderRadius}
          type="color"
          onClick={onClick}
        >
          {item.buttonText}
        </Button>
        <AddText>{t('homePage.ad')}</AddText>
      </Container>
    )
  }

  render() {
    const {
      type,
      orientation,
      data,
      extraData,
      onShowAd,
      t,
      isLoading,
    } = this.props

    if (type === 'ads') {
      return (
        <AdMobBannerWrapper onPress={onShowAd}>
          <AdmobBanner source={appBanner}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <>
                <BannerText onPress={onShowAd}>
                  {t('homePage.viewAdsBanner')}
                </BannerText>
                <BannerText onPress={onShowAd}>
                  {t('homePage.earnPointsBanner')}
                </BannerText>
              </>
            )}
          </AdmobBanner>
        </AdMobBannerWrapper>
      )
    }

    return (
      <SnapCarouselContainer>
        <SnapCarousel
          testID="SnapCarousel"
          data={data}
          renderItem={this.renderItem}
          // loop
          extraData={[orientation, ...extraData]}
          // autoplay
          // autoplayDelay={10000}
          sliderWidth={styles.SnapCarousel.getSliderWidth()}
          itemWidth={styles.SnapCarousel.getItemWidth()}
          {...styles.SnapCarousel}
        />
      </SnapCarouselContainer>
    )
  }
}

SliderAdvertising.propTypes = {
  orientation: PropTypes.string,
  data: PropTypes.array,
  extraData: PropTypes.array,
  onClick: PropTypes.func,
  t: PropTypes.func,
  type: PropTypes.oneOf(['ads', 'sponsor']),
  onShowAd: PropTypes.func,
  isLoading: PropTypes.bool,
}

SliderAdvertising.defaultProps = {
  data: [
    {
      image: ads,
      title: 'common.placeYourAdHere',
      buttonText: 'GRAB IT',
    },
  ],
  extraData: [],
  type: 'ads',
}

export default SliderAdvertising
