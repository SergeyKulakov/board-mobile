import React from 'react'
import PropTypes from 'prop-types'
import { Platform, View, Text } from 'react-native'
import moment from 'moment'

import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'
import {
  ChatButton,
  Input,
  InputWrapper,
  MicrophoneIcon,
  Right,
  ChatInactiveWrapper,
  ChatInactiveText,
} from './style'

const ChatInput = ({
  style,
  t,
  value,
  completedAt,
  onChangeText,
  onSend,
  onCreateTrack,
  isRecording,
  isChatInactive,
  ...inputProps
}) =>
  Platform.select({
    android: (
      <InputWrapper style={style}>
        {!isChatInactive ? (
          <>
            <Input
              testID="inputField"
              ref={inputProps.onRef}
              value={value}
              onChangeText={onChangeText}
              placeholder={t('deleteAccountScreen.typeHere')}
              autoFocus
              multiline
              {...inputProps}
            />
            <Right>
              <ChatButton testID="chatButton" onClick={onSend} />
              <MicrophoneIcon isRecording={isRecording} onClick={onCreateTrack} />
            </Right>
          </>
        ) : (
          <ChatInactiveWrapper>
            <ChatInactiveText>
              {`Job closed: ${moment(Date.parse(completedAt)).format(
                'H:MM A DD MMM YYYY',
              )}`}
            </ChatInactiveText>
          </ChatInactiveWrapper>
        )}
      </InputWrapper>
    ),
    ios: (
      <KeyboardAccessoryView alwaysVisible>
        <InputWrapper style={style}>
          {!isChatInactive ? (
            <>
              <Input
                ref={inputProps.onRef}
                value={value}
                onChangeText={onChangeText}
                placeholder={t('deleteAccountScreen.typeHere')}
                autoFocus
                multiline
                {...inputProps}
              />
              <Right>
                <ChatButton testID="chatButton" onClick={onSend} />
                <MicrophoneIcon
                  isRecording={isRecording}
                  onClick={onCreateTrack}
                />
              </Right>
            </>
          ) : (
            <ChatInactiveWrapper>
              <ChatInactiveText>
                {`Job closed: ${moment(Date.parse(completedAt)).format(
                  'H:MM A DD MMM YYYY',
                )}`}
              </ChatInactiveText>
            </ChatInactiveWrapper>
          )}
        </InputWrapper>
      </KeyboardAccessoryView>
    ),
  })

ChatInput.propTypes = {
  style: PropTypes.object,
  value: PropTypes.string,
  completedAt: PropTypes.string,
  onChangeText: PropTypes.func,
  t: PropTypes.func.isRequired,
  onSend: PropTypes.func,
  onCreateTrack: PropTypes.func,
  isRecording: PropTypes.bool,
}

export default ChatInput
