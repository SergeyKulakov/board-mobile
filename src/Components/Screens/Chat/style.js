import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'
import { Platform } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export const Container = styled.View`
  flex: 1;
`

export const MessagesList = styled(KeyboardAwareScrollView)`
  flex: 2;
  min-height: ${p =>
    Platform.select({
      ios: metrics.screenHeight - 100,
      android:
        metrics.screenHeight - 120 - p.isKeyboardShow ? p.keyboardHeight : 0,
    })};
`

export const ListHeaderWrapper = styled.View`
  flex-direction: column;
  padding-bottom: 20;
`

export const JobTitleWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const JobTitleDefaultText = styled.Text`
  font-size: 20;
  color: ${colors.disabledGray};
`

export const JobTitleText = styled(JobTitleDefaultText)`
  font-weight: bold;
  color: ${colors.textGray};
`

export const ChatMessageWrapper = styled.View`
  display: ${p => (p.isVisible ? 'flex' : 'none')};
  margin-bottom: 20;
`
