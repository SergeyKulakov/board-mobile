import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isUrl from 'is-url'
import { getProfileAvatar } from 'Helpers/getImageUri'

import { Image } from '../Image'
import { Icon } from '../Icon'

import {
  Container,
  ImageContainer,
  CheckContainer,
  IconAvatarContainer,
  styles,
} from './style'

class ProviderPhoto extends Component {
  shouldComponentUpdate(prevProps) {
    const { isCheck, avatarURL } = this.props
    return isCheck !== prevProps.isCheck || prevProps.avatarURL !== avatarURL
  }

  render() {
    const { avatarURL, username, isCheck, style } = this.props

    return (
      <Container style={style}>
        {avatarURL ? (
          <ImageContainer>
            <Image
              resizeMode="cover"
              withLoading
              data={
                isUrl(avatarURL)
                  ? avatarURL
                  : getProfileAvatar(avatarURL, username)
              }
            />
          </ImageContainer>
        ) : (
          <IconAvatarContainer>
            <Icon {...styles.IconAvatar} />
          </IconAvatarContainer>
        )}
        {isCheck ? (
          <CheckContainer>
            <Icon {...styles.IconCheck} />
          </CheckContainer>
        ) : null}
      </Container>
    )
  }
}

ProviderPhoto.propTypes = {
  avatarURL: PropTypes.string,
  username: PropTypes.string,
  isCheck: PropTypes.bool,
  style: PropTypes.any,
}

export { ProviderPhoto }
