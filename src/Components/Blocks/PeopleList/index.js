import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getTranslate } from 'Helpers/languages'
import _ from 'lodash'

import { FlatList, TouchableOpacity } from 'react-native'
import { ShadowBox, ProviderPhoto, StarsIcon } from 'Components/UI'

import { hitSlop } from './config'
import {
  Container,
  ProviderContainer,
  styles,
  Text,
  Header,
  Link,
  Content,
  PhotoContainer,
  TitleWrapper,
} from './style'

class PeopleList extends PureComponent {
  state = {
    buttonWidth: 100,
  }

  handleSaveButtonWith = ({
    nativeEvent: {
      layout: { width },
    },
  }) => {
    this.setState({ buttonWidth: width })
  }

  renderItem = ({ item }) => {
    const { userObjKey, onClickItem } = this.props
    const user = userObjKey ? item[userObjKey] : item

    if (_.isEmpty(user) || !_.isObject(user)) return null

    return (
      <TouchableOpacity
        onPress={() => onClickItem(item)}
        disabled={!_.isFunction(onClickItem)}
      >
        <ProviderContainer>
          <PhotoContainer>
            <ProviderPhoto
              name={user.given_name}
              avatarURL={user.avatarURL}
              username={user.username}
              isCheck={item.idVerified}
            />
          </PhotoContainer>
          {user.family_name && user.given_name ? (
            <Text>
              {user.family_name} {user.given_name[0].toUpperCase()}.
            </Text>
          ) : (
            <Text>{user.username}</Text>
          )}
          {user.rate ? <StarsIcon value={user.rate} /> : null}
        </ProviderContainer>
      </TouchableOpacity>
    )
  }

  render() {
    const { text, data, onClickHeaderLink } = this.props
    const { buttonWidth } = this.state

    return (
      <Container>
        <Header>
          <TitleWrapper width={buttonWidth}>
            <ShadowBox.Title>{text.title}</ShadowBox.Title>
          </TitleWrapper>
          <TouchableOpacity
            testID="viewAllButton"
            hitSlop={hitSlop}
            onPress={onClickHeaderLink}
            onLayout={this.handleSaveButtonWith}
            disabled={!_.isFunction(onClickHeaderLink)}
          >
            <Link>
              {text.rightText || getTranslate('homePage.viewAll').toUpperCase()}
            </Link>
          </TouchableOpacity>
        </Header>
        <Content>
          <FlatList
            keyExtractor={item => item._id || item.username || item.title}
            listKey="ServicesList"
            testID="peopleList"
            data={data}
            horizontal
            contentContainerStyle={styles.List}
            renderItem={this.renderItem}
          />
        </Content>
      </Container>
    )
  }
}

PeopleList.propTypes = {
  text: PropTypes.shape({
    title: PropTypes.string,
    rightText: PropTypes.string,
  }),
  userObjKey: PropTypes.string,
  data: PropTypes.array,
  onClickHeaderLink: PropTypes.func,
  onClickItem: PropTypes.func,
}

export { PeopleList }
