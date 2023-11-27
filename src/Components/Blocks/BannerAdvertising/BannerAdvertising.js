import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import isUrl from 'is-url'
import { isBase64 } from 'Helpers/isBase64'
import { banner } from 'Assets/images/SliderAdvertising'

import { TouchableWithoutFeedback } from 'react-native'

import { Container, TextContainer, Text } from './style'

const BannerAdvertising = ({ image, text, onClick, t }) => {
  let source = banner

  if (image) {
    if (isUrl(image) || isBase64(image)) {
      source = { uri: image }
    } else {
      source = image
    }
  }

  return <TouchableWithoutFeedback onPress={onClick} disabled={!_.isFunction(onClick)}>
      <Container source={source} resizeMode="cover">
        <TextContainer>
          <Text>{text || t('landingPage.viewAds')}</Text>
        </TextContainer>
      </Container>
    </TouchableWithoutFeedback>
}

BannerAdvertising.propTypes = {
  text: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  t: PropTypes.func,
}

export default BannerAdvertising
