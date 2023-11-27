import React from 'react'
import PropTypes from 'prop-types'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import Fa5Icon from 'react-native-vector-icons/FontAwesome5'
import AntIcon from 'react-native-vector-icons/AntDesign'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import FeIcon from 'react-native-vector-icons/Feather'
import IonIcon from 'react-native-vector-icons/Ionicons'
import FoundationIcon from 'react-native-vector-icons/Foundation'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import { TouchableOpacity, ActivityIndicator } from 'react-native'

import { colors } from 'Themes'
import { hitSlop } from './config'
import { Container } from './style'

const Icon = ({
  name,
  size,
  color,
  disabled,
  loaderColor,
  visible,
  loading,
  type,
  onClick,
  onLongClick,
  style,
}) => {
  const renderIcon = () => {
    const defaultProps = { name, size, color }
    switch (type) {
      case 'fa':
        return <FaIcon testID="faIcon" {...defaultProps} />
      case 'fa5':
        return <Fa5Icon testID="faIcon" {...defaultProps} />
      case 'ant':
        return <AntIcon testID="antIcon" {...defaultProps} />
      case 'mci':
        return <MCIcon testID="mciIcon" {...defaultProps} />
      case 'mi':
        return <MIcon testID="miIcon" {...defaultProps} />
      case 'fe':
        return <FeIcon testID="feIcon" {...defaultProps} />
      case 'ion':
        return <IonIcon testID="ionIcon" {...defaultProps} />
      case 'foundation':
        return <FoundationIcon testID="ionIcon" {...defaultProps} />
      case 'evil':
        return <EvilIcon testID="ionIcon" {...defaultProps} />
      default:
        return <FaIcon testID="faIcon" {...defaultProps} />
    }
  }

  const _renderLoader = () => (
    <ActivityIndicator
      size="small"
      color={loaderColor || color || colors.blue}
    />
  )

  const renderContent = () => (
    <Container
      visible={visible}
      style={onClick || onLongClick ? undefined : style}
    >
      {loading ? _renderLoader() : renderIcon()}
    </Container>
  )

  if (onClick || onLongClick) {
    return (
      <TouchableOpacity
        testID="touchableField"
        disabled={disabled}
        onPress={onClick}
        onLongPress={onLongClick}
        hitSlop={hitSlop}
        style={style}
      >
        {renderContent()}
      </TouchableOpacity>
    )
  }

  return renderContent()
}

Icon.propTypes = {
  name: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  loaderColor: PropTypes.string,
  visible: PropTypes.bool,
  type: PropTypes.string,
  loading: PropTypes.bool,
  testID: PropTypes.string,
  onClick: PropTypes.func,
  onLongClick: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

Icon.defaultProps = {
  size: 20,
  visible: true,
}

export { Icon }
