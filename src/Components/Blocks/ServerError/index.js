import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { TouchableOpacity } from 'react-native'

import i18n from 'I18N'
import { Icon } from 'Components/UI'
import { ScreenLoader } from 'Components/Blocks/ScreenLoader'
import {
  Container,
  IconBlock,
  Title,
  ReloadBlock,
  ReloadText,
  styles,
} from './style'

const ServerError = ({ text, loading, onReload }) => {
  return (
    <Container>
      <IconBlock>
        <Icon {...styles.Icon} />
      </IconBlock>
      <Title>{text || i18n.t('ServerError.title')}</Title>
      {_.isFunction(onReload) ? (
        <ReloadBlock>
          <TouchableOpacity onPress={onReload}>
            <Icon {...styles.ReloadIcon} />
          </TouchableOpacity>
          <ReloadText>{i18n.t('ServerError.reload')}</ReloadText>
        </ReloadBlock>
      ) : null}
      {_.isBoolean(loading) ? <ScreenLoader visible={loading} /> : null}
    </Container>
  )
}

ServerError.propTypes = {
  text: PropTypes.string,
  loading: PropTypes.bool,
  onReload: PropTypes.func,
}

export { ServerError }
