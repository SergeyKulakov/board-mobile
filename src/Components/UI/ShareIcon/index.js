import React from 'react'
import { colors } from 'Themes'
import { Icon } from '../Icon'

export const ShareIcon = ({ size = 20, color = colors.white, ...props }) => {
  const name = 'send'
  const type = 'fe'

  return <Icon {...props} name={name} type={type} size={size} color={color} />
}
