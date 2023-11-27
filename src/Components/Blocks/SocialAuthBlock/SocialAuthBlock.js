import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { setupRoot } from 'Navigation'

import { Linking } from 'react-native'
import { SocialButton } from 'Components/Blocks'

import { getRequestUrl } from './config'
import { Container, styles } from './style'

class SocialAuthBlock extends PureComponent {
  componentDidMount() {
    Linking.addEventListener('url', this.handleUrl)
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleUrl)
  }

  handleUrl = ({ url }) => {
    const { onFederatedSignIn, toast, getError } = this.props
    onFederatedSignIn({
      url,
      callback: ({ error }) => {
        if (error) toast(getError(error))
        else setupRoot(true)
      },
    })
  }

  handleLinkClick = link => {
    if (__DEV__) console.log('request to: ', getRequestUrl(link))
    Linking.openURL(getRequestUrl(link))
  }

  render() {
    return (
      <Container>
        <SocialButton
          {...styles.SocialButton.facebook}
          onClick={() => this.handleLinkClick('facebook')}
        />
        <SocialButton
          {...styles.SocialButton.google}
          onClick={() => this.handleLinkClick('google')}
        />
        <SocialButton
          {...styles.SocialButton.linkedIn}
          onClick={() => this.handleLinkClick('linkedin')}
        />
      </Container>
    )
  }
}

SocialAuthBlock.propTypes = {
  toast: PropTypes.func.isRequired,
  onFederatedSignIn: PropTypes.func.isRequired,
  getError: PropTypes.func,
}

export default SocialAuthBlock
