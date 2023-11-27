import styled from 'styled-components/native'
import { colors } from 'Themes'
import { GradientContainer, Icon } from 'Components/UI'

export const Container = styled.View`
  flex: 1;
`

export const Content = styled.View`
  flex: 1;
`

export const ChatCardWrapper = styled.TouchableHighlight`
  margin-top: 5;
  margin-bottom: 10;
  elevation: 7;
  background-color: #fff;
  box-shadow: 0 0 10px ${colors.disabledGray};
`

export const ActionsWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  background-color: ${p => (p.isActive ? colors.red : colors.gradientStart)};
  margin-top: 5;
  margin-bottom: 10;
`

export const BlockWrapper = styled.TouchableOpacity`
  width: 120;
  height: 100%;
`

export const GradientActionWrapper = styled(GradientContainer).attrs(
  ({ isActive }) => ({
    gradient: {
      start: isActive ? colors.red : colors.gradientStart,
      end: isActive ? colors.brightRed : colors.gradientEnd,
    },
  }),
)`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const ActionIcon = styled(Icon).attrs(({ isActive }) => ({
  type: 'ant',
  name: isActive ? 'deleteuser' : 'adduser',
  color: colors.white,
  size: 30,
}))``

export const ActionText = styled.Text`
  font-size: 16;
  color: ${colors.white};
  text-align: center;
`

export const ActivityIndicatorWrapper = styled.View`
  padding-vertical: 10;
`

export const EmptyView = styled.View`
  display: none;
`
