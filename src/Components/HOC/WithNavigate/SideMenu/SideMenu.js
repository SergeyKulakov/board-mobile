import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Navigation } from 'react-native-navigation'
import * as routes from 'Constants/routes'
import { profileImageTypes } from 'Services/Constants/profileImages.constants'
import { getProfileImage } from 'Helpers/getImageUri'

import { FlatList, TouchableOpacity } from 'react-native'

import { getText, getData } from './config'
import { UserInfo, Link } from './innerBlocks'
import { Wrapper, ListContainer, LogOutText } from './style'

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
    const { onClose } = this.props
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

    onClose()
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
        <UserInfo
          email={user.email}
          avatarUrl={getProfileImage({
            type: profileImageTypes.avatar,
            src: user.avatarURL,
            userId: user.username,
          })}
          userName={userName}
          isPremium={user.isPremium}
          onAvatarClick={this.handleAvatarClick}
          onPremiumClick={() => this.handlePush(routes.subscriptions)}
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
  onClose: PropTypes.func,
}

export default SideMenu
