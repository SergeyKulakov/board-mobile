import styled from 'styled-components/native'
import { colors } from 'Themes'
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from '../Icon'

export const Container = styled.View`
  flex: 1;
`

export const ActionContent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const AcceptIcon = styled(Icon).attrs(() => ({
  name: 'check',
  color: colors.white,
}))`
  margin-bottom: 10;
`

export const RejectIcon = styled(Icon).attrs(() => ({
  name: 'times',
  color: colors.white,
}))`
  margin-bottom: 10;
`

export const Text = styled.Text`
  font-size: 14;
  color: ${colors.white};
  text-align: center;
`

const acceptGradient = {
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
  colors: [colors.funGreen, colors.jade],
}
const rejectGradient = {
  start: { x: 1, y: 0 },
  end: { x: 0, y: 0 },
  colors: [colors.brightRed, colors.red],
}

export const GradientContainer = styled(LinearGradient).attrs(props =>
  props.isRed ? rejectGradient : acceptGradient,
)`
  flex: 1;
`
