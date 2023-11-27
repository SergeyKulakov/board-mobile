import styled from 'styled-components/native'
import { Icon } from 'Components/UI'
import { colors } from 'Themes'
import { Platform } from 'react-native'

export const Container = styled.View`
  border: solid 0 ${colors.disabledGray};
  border-bottom-width: ${p => (p.isLastItem ? 0 : '1px')};
  justify-content: space-between;
  flex-direction: row;
  padding-bottom: 10%;
  padding-top: 5%;
`

export const Title = styled.Text`
  font-size: 16;
  color: ${colors.textGray};
  margin-bottom: 2%;
`

export const StatusInfo = styled.Text`
  color: ${colors.textGray};
  font-size: 14;
  margin-right: 5%;
  min-width: 120;
`

export const InfoBlock = styled.View`
  flex-direction: column;
  width: 80%;
`

export const StatusInfoBlock = styled.View`
  flex-direction: row;
  align-items: center;
`

export const IconContainer = styled.View`
  position: relative;
`

export const CloseIcon = styled(Icon).attrs({
  name: 'times',
  size: 18,
  color: colors.blue,
})``

export const switchStyle = {
  transform: Platform.select({
    android: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
    ios: [{ scaleX: 0.6 }, { scaleY: 0.6 }],
  }),
}
