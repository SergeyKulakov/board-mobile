import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Alert, Platform, PermissionsAndroid } from 'react-native'
import _ from 'lodash'
import memoize from 'memoize-one'
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player'
import superagent from 'superagent'
// import { transcode } from 'react-native-audio-transcoder'
import RNHeicConverter from 'react-native-heic-converter'

import { socketEvent } from 'Redux/actions/api'
import { ChatMessage, ScreenLoader } from 'Components/Blocks'
import { ChatInput } from 'Components/UI'
import { Header } from './innerBlocks'

import axios from 'axios'

import { getAccessToken } from 'Redux/selectors/auth'
import { apiUrl } from 'Constants/api'
import { blockChatConst, unblockChatConst } from 'Constants/chats'

import {
  Container,
  MessagesList,
  ListHeaderWrapper,
  JobTitleWrapper,
  JobTitleDefaultText,
  JobTitleText,
  ChatMessageWrapper,
} from './style'

const audioRecorderPlayer = new AudioRecorderPlayer()

let myInterval,
  grantedWrite,
  grantedRecord = null

class Chat extends React.Component {
  state = {
    message: '',
    isRecording: false,
    isPlayingVoiceMressage: false,
    currentItemId: null,
    currentPositionSec: null,
    currentDurationSec: null,
    playTime: 0,
    duration: 0,
    isSendingVoice: false,
    isTesterCount: false,
    voiceTime: 0,
    chatMessages: null,
    recordTime: 0,
  }

  input = React.createRef()

  messagesList = React.createRef()

  // getMessages = memoize(data => data.map(this.renderMessage))

  componentDidMount() {
    const { data } = this.props
    const { chatMessages } = this.state

    if (Platform.OS === 'android') {
      this.handleGrandAndroid()
    }

    if (!_.isEmpty(data)) {
      if (!_.isEmpty(data.messages)) {
        if (_.isEmpty(chatMessages)) {
          // this.setState({ isSendingVoice: true }, () => {
          this.setState({
            chatMessages: data.messages,
            // isSendingVoice: false,
          })
          // })
        }
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { data, isKeyboardShow } = this.props
    const { chatMessages } = this.state

    if (
      !_.isEqual(prevProps.data.messages, data.messages) ||
      isKeyboardShow !== prevProps.isKeyboardShow
    ) {
      this.scrollToBottom(true)
    }

    if (!_.isEmpty(data) && !_.isEmpty(prevProps.data)) {
      if (!_.isEmpty(data.messages)) {
        if (data.messages.length !== prevProps.data.messages.length) {
          this.setState({
            chatMessages: [
              ...chatMessages,
              data.messages[data.messages.length - 1],
            ],
          })
        }
      }
    }

  getMessages = item => {
    const { data } = this.props

    if (!_.isEmpty(data)) {
      return item.map(this.renderMessage)
    }
  }

  scrollToBottom = (animated = false) => {
    setTimeout(() => {
      this.messagesList.current.scrollToEnd({
        animated,
      })
    }, 100)
  }

  handleGrandAndroid = async () => {
    grantedWrite = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    )
    grantedRecord = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    )
  }

  handleViewLoaded = () => this.scrollToBottom()

  handleChangeMessage = message => this.setState({ message })

  handleLockPartner = () => {
    const {
      data,
      onConnectToChat,
      onInvokeChatAction,
      navigate,
      user,
    } = this.props

    onInvokeChatAction(data)
    // () => {if (user) onConnectToChat(user.username)}
    // onInvokeChatAction(data, navigate.hideModal)
  }

  handleSendMessage = () => {
    const { onSendMessage, user, data } = this.props
    const { message } = this.state

    if (!_.trim(message)) return

    this.setState({ message: '' }, () => {
      onSendMessage({ chatId: data._id, message }, user.username)
    })
  }

  handleStartRecord = async () => {
    const audioSet = {
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    }

    // const path = Platform.OS === 'ios' ? 'voice.mp4' : null

    if (Platform.OS === 'ios') {
      await audioRecorderPlayer.startRecorder('sound.aac', audioSet)
    } else {
      await audioRecorderPlayer.startRecorder()
    }
    // setInterval(this.setState({testerCount: true}))

    // this.setState({ isTesterCount: true })

    audioRecorderPlayer.addRecordBackListener(e => {
      this.setState({ recordTime: e.current_position })
      return
    })
  }

  handleStopRecord = async () => {
    const {
      onSendMessage,
      user,
      data,
      onSendVoiceMessage,
      onConnectToChat,
    } = this.props
    const { chatMessages, voiceTime, recordTime } = this.state
    const result = await audioRecorderPlayer.stopRecorder()
    audioRecorderPlayer.removeRecordBackListener()

    if (result) {
      const expansion = Platform.OS === 'ios' ? 'aac' : 'mp4'

      const dataFile = new FormData()
      dataFile.append('file', {
        uri: result,
        type: `file/${expansion}`,
        name: `${expansion}`,
        ['Content-Type']: 'multipart/form-data',
      })
      dataFile.append('senderId', user.username)
      dataFile.append('chatId', data._id)
      dataFile.append('duration', recordTime)

      this.setState({ recordTime: 0 })

      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }

      Alert.alert(
        'Whould you like to send the voice mesage?',
        '',
        [
          {
            text: 'Cancel',
            onPress: () => {
              return null
            },
            style: 'cancel',
          },
          {
            text: 'Send',
            onPress: () => {
              this.setState({ isSendingVoice: true }, () => {
                return axios
                  .post(
                    'https://chat-prod.spotjobsapp.com/chat/voice-message',
                    dataFile,
                    config,
                  )
                  .then(response => {
                    // this.setState({ isSendingVoice: false })
                    this.setState(
                      {
                        chatMessages: !_.isEmpty(chatMessages)
                          ? [...chatMessages, response.data]
                          : [response.data],
                      },
                      () => {
                        this.setState({ isSendingVoice: false })
                        this.scrollToBottom(true)
                      },
                    )
                  })
                  .catch(error => {
                    this.setState({ isSendingVoice: false })
                  })
              })
            },
          },
        ],
        { cancelable: false },
      )
    }
  }

  hanldeUpdatePlayTime = duration => {
    const { playTime } = this.state
    this.setState({ playTime: playTime + 1 })
    if (!(playTime >= duration)) {
      this.setState({ playTime: playTime + 1 })
    } else {
      this.setState({
        playTime: 0,
        isPlayingVoiceMressage: false,
        currentItemId: null,
      })
      clearInterval(myInterval)
      audioRecorderPlayer.stopPlayer()
    }
  }

  handleStartPlay = async item => {
    const {
      isPlayingVoiceMressage,
      duration,
      currentItemId,
      playTime,
    } = this.state

    const changeVoiceChat = currentItemId !== item._id && !!currentItemId

    // clearInterval(myInterval)
    if (changeVoiceChat) {
      audioRecorderPlayer.stopPlayer()
      clearInterval(myInterval)
      this.setState({ playTime: 0 })
    }

    myInterval = setInterval(
      () => this.hanldeUpdatePlayTime(Math.ceil(item.duration / 1000) || 1),
      1000,
    )

    await audioRecorderPlayer.startPlayer(item.text)
    this.setState({ isPlayingVoiceMressage: true, currentItemId: item._id })
  }

  handlePausePlay = () => {
    const { isPlayingVoiceMressage } = this.state

    if (isPlayingVoiceMressage) {
      this.setState({ isPlayingVoiceMressage: false }, async () => {
        await audioRecorderPlayer.pausePlayer()
        clearInterval(myInterval)
      })
    }
  }

  handleAndoirPermissionsRequest = async () => {
    try {
      grantedWrite = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Permissions for write access',
          message: 'Give permission to your storage to write a file',
          buttonPositive: 'ok',
        },
      )
    } catch (err) {
      console.warn(err)
      return
    }
    try {
      grantedRecord = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Permissions for write access',
          message: 'Give permission to your storage to write a file',
          buttonPositive: 'ok',
        },
      )
      if (grantedRecord === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
        return
      }
    } catch (err) {
      console.warn(err)
      return
    }
  }

  handleRecordSound = () => {
    const { isRecording } = this.state

    if (Platform.OS === 'android') {
      if (!(grantedWrite && grantedRecord)) {
        this.handleAndoirPermissionsRequest()
      }
    }

    if (Platform.OS === 'ios' || (grantedWrite && grantedRecord)) {
      this.setState({ isRecording: !isRecording }, () => {
        if (!isRecording) {
          this.handleStartRecord()
        } else {
          this.handleStopRecord()
        }
      })
    }
  }

  renderMessagesListHeader = () => {
    const { t, jobTitle } = this.props

    return (
      <ListHeaderWrapper>
        {jobTitle ? (
          <JobTitleWrapper>
            <JobTitleDefaultText>{t('jobPost.jobTitle')}: </JobTitleDefaultText>
            <JobTitleText>{jobTitle}</JobTitleText>
          </JobTitleWrapper>
        ) : null}
      </ListHeaderWrapper>
    )
  }

  renderMessage = item => {
    const { user, data } = this.props
    const { isPlayingVoiceMressage, currentItemId, playTime } = this.state

    if (_.isEmpty(item)) return null

    const avatarUrl =
      item.sender === user.username
        ? user.avatarURL
        : _.get(data, 'partner.avatarURL')

    return (
      <ChatMessageWrapper
        key={item._id}
        isVisible={
          !(item.text === blockChatConst || item.text === unblockChatConst)
        }
      >
        <ChatMessage
          text={item.text}
          author={item.sender}
          avatarUrl={avatarUrl}
          createAt={item.createdAt}
          isMyMessage={item.sender === user.username}
          isVoiceMessage={item.type === 'voice_message'}
          itemId={item._id}
          currentItemId={currentItemId}
          voiceMessageTime={playTime}
          voiceMessageDuration={Math.ceil(item.duration / 1000)}
          isPlayingVoice={isPlayingVoiceMressage}
          onPlayClick={() => this.handleStartPlay(item)}
          onPauseClick={this.handlePausePlay}
          onPlayTime={this.handlePlayTime}
        />
      </ChatMessageWrapper>
    )
  }

  render() {
    const {
      navigate,
      data,
      isKeyboardShow,
      keyboardHeight,
      requestChatId,
      user,
    } = this.props
    const {
      message,
      isRecording,
      isPlayingVoiceMressage,
      isSendingVoice,
      chatMessages,
    } = this.state

    const messages = this.getMessages(chatMessages || [])

    return (
      <Container>
        <Header
          isChatBlocked={data.blockedBy !== 'disabled' && !!data.blockedBy}
          isChatInactive={data.blockedBy === 'inactive'}
          onBackClick={navigate.hideModal}
          onLockUserClick={this.handleLockPartner}
          isLockButtonLoading={Boolean(requestChatId)}
          user={data.partner || {}}
        />

        <MessagesList
          testID="messagesList"
          isShowKeyboard={isKeyboardShow}
          keyboardHeight={keyboardHeight}
          ref={this.messagesList}
          onLayout={this.handleViewLoaded}
        >
          {this.renderMessagesListHeader()}
          {messages}
        </MessagesList>

        {(data.blockedBy === 'disabled' || !data.blockedBy) && (
          <ChatInput
            isRecording={isRecording}
            isChatInactive={data.blockedBy === 'inactive'}
            onChangeText={this.handleChangeMessage}
            value={message}
            completedAt={
              !_.isEmpty(data)
                ? !_.isEmpty(data.completedAt) && data.completedAt
                : null
            }
            onCreateTrack={this.handleRecordSound}
            onSend={this.handleSendMessage}
          />
        )}
        <ScreenLoader visible={isSendingVoice} />
      </Container>
    )
  }
}

Chat.propTypes = {
  navigate: PropTypes.shape({
    hideModal: PropTypes.func.isRequired,
  }),
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    messages: PropTypes.array,
    partner: PropTypes.shape({
      avatarURL: PropTypes.string,
    }),
  }),
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatarURL: PropTypes.string,
  }),
  t: PropTypes.func,
  onSendMessage: PropTypes.func,
  jobTitle: PropTypes.string,
  isKeyboardShow: PropTypes.bool,
  keyboardHeight: PropTypes.number,
  onInvokeChatAction: PropTypes.func,
  requestChatId: PropTypes.string,
}

export default Chat
