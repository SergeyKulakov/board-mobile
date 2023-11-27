import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { TouchableOpacity, ActivityIndicator } from 'react-native'

import { Container, Text, Link, styles } from './style'

const VerifyError = ({ text, loading, onClick }) => {
  const _renderLink = () => {
    if (loading) return <ActivityIndicator {...styles.Loader} />

    return <Link>{text.link}</Link>
  }

  return (
    <Container>
      <Text>{text.info}</Text>
      <TouchableOpacity onPress={onClick}>
        {_.isString(text.link) ? _renderLink() : null}
      </TouchableOpacity>
    </Container>
  )
}

VerifyError.propTypes = {
  text: PropTypes.shape({
    info: PropTypes.string,
    link: PropTypes.string,
  }),
  loading: PropTypes.bool,
  onClick: PropTypes.func,
}

export { VerifyError }
