import React from 'react'
import PropTypes from 'prop-types'

import i18n from 'I18N'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { ShadowBox } from 'Components/UI'

import { Container, Header, Link, styles } from './style'

const Wrapper = ({ title, children, onClickShowAll }) => (
  <ShadowBox style={styles.BoxShadow}>
    <TouchableWithoutFeedback>
      <Container>
        <Header>
          <ShadowBox.Title>{title}</ShadowBox.Title>
          <TouchableOpacity onPress={onClickShowAll}>
            <Link>{i18n.t('landingPage.viewAll')}</Link>
          </TouchableOpacity>
        </Header>
        {children}
      </Container>
    </TouchableWithoutFeedback>
  </ShadowBox>
)

Wrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClickShowAll: PropTypes.func,
}

export { Wrapper }
