import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { Linking, TouchableOpacity } from 'react-native'
import { Checkbox } from 'Components/UI'

import { requestUrl } from './config'
import { Container, Text, Link } from './style'

class LicenseAgreement extends Component {
  componentDidMount() {
    Linking.addEventListener('url', this.handleUrl)
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleUrl)
  }

  handleUrl = () => {
    const { onSuccess } = this.props

    if (_.isFunction(onSuccess)) onSuccess()
  }

  render() {
    const { value, text, onChange, t } = this.props

    return (
      <Container>
        <Checkbox onChange={onChange} checked={value} />
        <Text>{text.iAgreeToThe || t('sign.IAgree')} </Text>
        <TouchableOpacity onPress={() => Linking.openURL(requestUrl)}>
          <Link>{text.link || t('sign.TermsAndConditions')}</Link>
        </TouchableOpacity>
      </Container>
    )
  }
}

LicenseAgreement.propTypes = {
  text: PropTypes.shape({
    iAgreeToThe: PropTypes.string,
    link: PropTypes.string,
  }),
  value: PropTypes.bool,
  onSuccess: PropTypes.func,
  onChange: PropTypes.func,
  t: PropTypes.func,
}

LicenseAgreement.defaultProps = {
  text: {},
}

export default LicenseAgreement
