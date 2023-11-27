import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Image } from 'react-native'

import * as flags from 'Assets/images/Flags'

import { Icon, style } from './style'

const FlagIcon = ({ fileName, ...props }) =>
  fileName ? (
    <Image
      source={_.isString(fileName) ? flags[fileName] : fileName}
      style={style.image}
      resizeMode="contain"
      {...props}
    />
  ) : (
    <Icon />
  )

FlagIcon.propTypes = {
  fileName: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export { FlagIcon }
