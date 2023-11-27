import React from 'react'
import { colors } from 'Themes'

import { Icon } from '../Icon'

const ChatButton = props => (
  <Icon
    name="send"
    color={colors.blue}
    size={25}
    type="mci"
    {...props}
  />
)

export { ChatButton }
