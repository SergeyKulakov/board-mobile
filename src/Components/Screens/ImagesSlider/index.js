import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import withOrientation from 'Components/HOC/withOrientation'

import { TouchableWithoutFeedback } from 'react-native'
import { Icon, Image } from 'Components/UI'
import SnapCarousel from 'react-native-snap-carousel'

import config from './config'
import { Container, ImageContainer, Header, styles } from './style'

const ImagesSlider = ({
  data,
  containerStyle,
  orientation,
  onClick,
  navigate,
  activeIndex,
}) => {
  const _renderItem = ({ item }) => {
    const content = (
      <ImageContainer>
        <Image data={item} {...config.defaultImageProps} withLoading />
      </ImageContainer>
    )

    if (_.isFunction(onClick)) {
      return (
        <TouchableWithoutFeedback onPress={onClick}>
          {content}
        </TouchableWithoutFeedback>
      )
    }

    return content
  }

  return (
    <Container style={containerStyle}>
      <Header>
        <Icon {...styles.CloseIcon} onClick={navigate.hideModal} />
      </Header>
      <SnapCarousel
        data={_.isArray(data) ? data : [data]}
        renderItem={_renderItem}
        // loop={Boolean(data.length)}
        extraData={[orientation]}
        firstItem={activeIndex || 0}
        sliderWidth={styles.SnapCarousel.getSliderWidth()}
        itemWidth={styles.SnapCarousel.getItemWidth()}
        {...styles.SnapCarousel}
      />
    </Container>
  )
}

ImagesSlider.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]), // from passProps
  activeIndex: PropTypes.number,
  onClick: PropTypes.func, // from passProps
  containerStyle: PropTypes.object, // from passProps
  orientation: PropTypes.string.isRequired, // from withOrientation hoc
  navigate: PropTypes.object.isRequired, // from navigate hoc
}

export default withOrientation(ImagesSlider)
