import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Navigation } from 'react-native-navigation'
import * as routes from 'Constants/routes'
import { profileImageTypes } from 'Services/Constants/profileImages.constants'
import { getProfileImage } from 'Helpers/getImageUri'
import { metrics } from 'Themes'

import { FlatList, TouchableOpacity } from 'react-native'

import { getData, getText } from './config'
import { Link, UserInfo } from './innerBlocks'
import { Wrapper, Container, ListContainer, LogOutText } from './style'

class SideMenu extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      text: getText(),
    }

    Navigation.events().bindComponent(this)
  }

  componentDidAppear() {
    this.setState({ text: getText() })
  }

  handlePush = route => {
    if (route === routes.home) {
      Navigation.popTo(routes.home)
    } else {
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
  }

  handleSignOut = async () => {
    const { onSignOut } = this.props

    onSignOut()
  }

  handleAvatarClick = () => {
    const { activeScreenName } = this.props

    if (activeScreenName !== routes.profile) {
      this.handlePush(routes.profile)
    }
  }

  handleSetPremium = () => {
    const { onSetPremium, navigate } = this.props

    onSetPremium()
    navigate.showMessage('SET PREMIUM')
  }

  render() {
    const { user, activeScreenName, orientation } = this.props
    const { text } = this.state

    const userName =
      user.name ||
      (user.given_name &&
        user.family_name &&
        `${user.given_name} ${user.family_name}`)

    return (
      <Wrapper>
        <Container style={{ height: metrics.getWindowHeight() }}>
          <UserInfo
            text={text}
            email={user.email}
            avatarUrl={getProfileImage({
              type: profileImageTypes.avatar,
              src: user.avatarURL,
              userId: user.username,
            })}
            userName={userName}
            isPremium={user.isPremium}
            onAvatarClick={this.handleAvatarClick}
            onSetPremium={this.handleSetPremium}
            onPremiumClick={() => {}}
          />
          <ListContainer>
            <FlatList
              keyExtractor={item => item.text}
              data={getData()}
              extraData={[text, orientation]}
              ListFooterComponent={
                <TouchableOpacity onPress={this.handleSignOut}>
                  <LogOutText>{text.logout}</LogOutText>
                </TouchableOpacity>
              }
              renderItem={({ item }) => (
                <Link
                  disabled={!item.key}
                  icon={item.icon}
                  text={item.text}
                  isActive={item.key === activeScreenName}
                  onClick={() => this.handlePush(routes[item.key])}
                />
              )}
            />
          </ListContainer>
        </Container>
      </Wrapper>
    )
  }
}

SideMenu.propTypes = {
  onSignOut: PropTypes.func,
  navigate: PropTypes.object,
  user: PropTypes.object,
  activeScreenName: PropTypes.string,
  onSetPremium: PropTypes.func,
  orientation: PropTypes.string,
}

export default SideMenu
