import React from 'react'
import PropTypes from 'prop-types'

import SnapCarousel from 'react-native-snap-carousel'

import { getData } from './config'
import { Navigation, SlashBlock } from '../index'
import { styles } from './style'

const ScrollBlock = ({ activeScreen, onChangeScrollNavigation }) => {
  const renderItem = ({ item, index }) => (
    <SlashBlock
      key={index}
      image={item.image}
      title={item.title}
      subTitle={item.subTitle}
    />
  )

  return (
    <>
      <SnapCarousel
        data={getData()}
        renderItem={renderItem}
        onBeforeSnapToItem={onChangeScrollNavigation}
        {...styles.SnapCarousel}
      />
      <Navigation activeScreen={activeScreen} />
    </>
  )
}

ScrollBlock.propTypes = {
  activeScreen: PropTypes.number.isRequired,
  onChangeScrollNavigation: PropTypes.func.isRequired,
}

export { ScrollBlock }
