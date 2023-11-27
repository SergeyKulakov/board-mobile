import React from 'react'
import PropTypes from 'prop-types'
import { getMessageTime } from 'Helpers/chats'

import {
  Container,
  Avatar,
  MessageWrapper,
  MessageText,
  Date,
  MessageVoiceWrapper,
  PlayIcon,
  PauseIcon,
  // CustomSlider,
  ManualSliderWrapper,
  ManualSlider,
} from './style'

//   <CustomSlider
//   maximumValue={voiceMessageDuration}
//   minimumValue={0}
//   step={voiceMessageDuration}
//   // value={(voiceMessageTime / voiceMessageDuration) * 100 || 0}
//   value={voiceMessageTime}
//   onSlidingComplete={value => onPlayTime(value, true)}
//   // onValueChange={value => onPlayTime(value, true)}
//   // onValueChange={value => {
//   //   clearTimeout(this.sliderTimeoutId)
//   //   this.sliderTimeoutId = setTimeout(() => {
//   //     onPlayTime(value, true)
//   //   }, 100)
//   // }}
// />

const ChatMessage = ({
  author,
  avatarUrl,
  createAt,
  text,
  children,
  isMyMessage,
  isVoiceMessage,
  voiceMessageTime,
  voiceMessageDuration,
  isPlayingVoice,
  onPlayClick,
  onPauseClick,
  onPlayTime,
  itemId,
  currentItemId,
}) => {
  return (
    <Container isReverse={!isMyMessage}>
      <Avatar avatarURL={avatarUrl} username={author} />
      <MessageWrapper isReverse={!isMyMessage}>
        {!isVoiceMessage ? (
          <MessageText isReverse={!isMyMessage}>{children || text}</MessageText>
        ) : (
          <MessageVoiceWrapper>
            {isPlayingVoice && currentItemId === itemId ? (
              <PauseIcon onClick={onPauseClick} />
            ) : (
              <PlayIcon onClick={onPlayClick} />
            )}

            <ManualSliderWrapper>
              {currentItemId === itemId && (
                <ManualSlider
                  width={(voiceMessageTime / voiceMessageDuration) * 100 || 0}
                />
              )}
            </ManualSliderWrapper>
          </MessageVoiceWrapper>
        )}
        <Date isReverse={!isMyMessage}>{getMessageTime(createAt)}</Date>
      </MessageWrapper>
    </Container>
  )
}

ChatMessage.propTypes = {
  author: PropTypes.string,
  avatarUrl: PropTypes.string,
  createAt: PropTypes.number,
  isMyMessage: PropTypes.bool,
  text: PropTypes.string,
  children: PropTypes.string,
  isVoiceMessage: PropTypes.bool,
  voiceMessageTime: PropTypes.number,
  voiceMessageDuration: PropTypes.number,
  isPlayingVoice: PropTypes.bool,
  onPlayClick: PropTypes.func,
  onPauseClick: PropTypes.func,
  onPlayTime: PropTypes.func,
  itemId: PropTypes.string,
  currentItemId: PropTypes.string,
}

export { ChatMessage }
