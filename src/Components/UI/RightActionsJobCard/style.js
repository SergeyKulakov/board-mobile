import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Container = styled.View`
  flex: 1;
`

export const ActionContent = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
`

export const ActionButton = styled.View`
  width: 50;
  height: 50;
  border-radius: 25;
  margin-right: 20;
  justify-content: center;
  align-items: center;
  background: ${colors.gradientEnd05};
`

export const styles = {
  getHeartIcon: (isActive, isDisabled) => ({
    name: isActive ? 'heart' : 'heart-o',
    size: 20,
    color: isDisabled
      ? colors.disabledGray
      : isActive
      ? colors.red
      : colors.white,
    loaderColor: colors.white,
  }),
  IconShare: {
    type: 'fe',
    name: 'send',
    size: 20,
    color: colors.white,
  },
}
