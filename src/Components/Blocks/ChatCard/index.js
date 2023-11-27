import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { getShortUserName } from 'Helpers/user'
import { getMessageTime } from 'Helpers/chats'
import { ActivityIndicator } from 'react-native'
import { blockChatConst, unblockChatConst } from 'Constants/chats'

import {
  Container,
  AvatarWrapper,
  Content,
  TopPart,
  UserName,
  LastDate,
  LastMessage,
  NameWrapper,
  Avatar,
} from './style'

const ChatCard = ({ messages, partner, isChatBlocked, isLoading }) => (
  <Container>
    <AvatarWrapper>
      <Avatar avatarURL={partner.avatarURL} username={partner.username} />
    </AvatarWrapper>
    <Content>
      <TopPart>
        <NameWrapper>
          <UserName isChatBlocked={isChatBlocked}>
            {getShortUserName(
              partner.given_name,
              partner.family_name,
              partner.username,
            )}
          </UserName>
          {isLoading ? <ActivityIndicator /> : null}
        </NameWrapper>
        {_.isEmpty(messages) ? null : (
          <LastDate isChatBlocked={isChatBlocked}>
            {getMessageTime(messages[messages.length - 1].createdAt)}
          </LastDate>
        )}
      </TopPart>
      {_.isEmpty(messages)
        ? null
        : messages[messages.length - 1].type !== 'voice_message' && (
            <LastMessage
              isChatBlocked={isChatBlocked}
              isVisible={
                !(
                  messages[messages.length - 1].text === blockChatConst ||
                  messages[messages.length - 1].text === unblockChatConst
                )
              }
            >
              {messages[messages.length - 1].text}
            </LastMessage>
          )}
    </Content>
  </Container>
)

ChatCard.propTypes = {
  messages: PropTypes.array,
  partner: PropTypes.object,
  isChatBlocked: PropTypes.bool,
  isLoading: PropTypes.bool,
}

export { ChatCard }
