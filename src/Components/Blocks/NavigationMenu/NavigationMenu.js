import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getNavigationIconStyle } from 'Helpers/icons'
import { Icon } from 'Components/UI'

import { Navigation } from 'react-native-navigation'

import * as routes from 'Constants/routes'
import { data } from './config'
import { Container, Item, Text, Circle, Wrapper, IconWrapper } from './style'

class NavigationMenu extends PureComponent {
  handlePush = route => {
    Navigation.push(routes.home, {
      component: {
        name: route,
        options: {
          topBar: {
            visible: false,
          },
        },
      },
    })
  }

  getSections = notifications => {
    const { t } = this.props
    return data.map(item => {
      return (
        <Wrapper
          testID="section"
          key={item.key}
          onPress={() => this.handlePush(item.key)}
        >
          <Item>
            <IconWrapper>
              <Icon {...getNavigationIconStyle(item.icon, 35)} />
            </IconWrapper>
            <Text image={item.image}>{t(item.text)}</Text>
            {item.key === routes.notifications &&
            notifications.some(el => !el.read) ? (
              <Circle />
            ) : null}
          </Item>
        </Wrapper>
      )
    })
  }

  render() {
    const { activeLanguage, notifications } = this.props

    const sections = this.getSections(notifications, activeLanguage)

    return <Container>{sections}</Container>
  }
}

NavigationMenu.propTypes = {
  activeLanguage: PropTypes.string,
  t: PropTypes.func,
  notifications: PropTypes.array,
}

export default NavigationMenu
