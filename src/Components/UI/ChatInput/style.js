import styled from 'styled-components/native'
import { colors } from 'Themes'
import { Icon } from '../Icon'
import { ChatButton as UIChatButton } from '../ChatButton'

export const Input = styled.TextInput`
  color: ${colors.textGray};
  flex: 1;
  width: 95%;
  font-size: 18;
  padding-left: 5;
  padding-top: 10;
  padding-bottom: 10;
`

export const ChatInactiveWrapper = styled.View`
  color: ${colors.textGray};
  flex: 1;
  justify-content: center;
  width: 95%;
  font-size: 18;
  padding-left: 5;
  padding-top: 10;
  padding-bottom: 10;
`

export const ChatInactiveText = styled.Text`
  margin: 0 auto;
`

// background-color: ${p => (p.isActive ? colors.red : colors.gradientStart)};

export const MicrophoneIcon = styled(Icon).attrs(() => ({
  name: 'mic',
  type: 'fe',
  size: 25,
  color: colors.blue,
}))`
  flex-direction: row;
  justify-content: center;
  margin-horizontal: 10;
  background-color: ${p => (p.isRecording ? colors.blue : 'transparent')};
`

export const Right = styled.ScrollView.attrs(() => ({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  showsVerticalScrollIndicator: false,
  pagingEnabled: true,
  keyboardShouldPersistTaps: 'always',
}))`
  max-width: 100;
`

export const ChatButton = styled(UIChatButton)`
  margin-horizontal: 10;
`

export const InputWrapper = styled.View`
  width: 100%;
  border: solid 0 ${colors.disabledGray};
  border-top-width: 1;
  flex-direction: row;
  align-items: center;
`
