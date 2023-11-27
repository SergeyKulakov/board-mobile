import React from 'react'
import PropTypes from 'prop-types'
import SnapCarousel from 'react-native-snap-carousel'

import config from './config'
import { Container } from './style'

const MapSlider = ({
  onCreateRef,
  data,
  renderItem,
  extraData,
  onChangeIndex,
}) => (
  <Container>
    <SnapCarousel
      ref={onCreateRef}
      style={{ flex: 1 }}
      data={data}
      extraData={[...extraData]}
      renderItem={renderItem}
      sliderWidth={config.SnapCarousel.getSliderWidth()}
      itemWidth={config.SnapCarousel.getItemWidth()}
      onBeforeSnapToItem={onChangeIndex}
    />
  </Container>
)

MapSlider.propTypes = {
  data: PropTypes.array,
  renderItem: PropTypes.func.isRequired,
  extraData: PropTypes.array,
  onChangeIndex: PropTypes.func.isRequired,
  onCreateRef: PropTypes.func,
}

MapSlider.defaultProps = {
  extraData: [],
}

export { MapSlider }
