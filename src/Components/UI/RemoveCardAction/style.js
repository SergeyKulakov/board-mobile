import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Container = styled.View`
  flex: 1;
`

export const ActionContent = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`

export const ActionButton = styled.View`
  width: 60;
  height: 60;
  border-radius: 35;
  overflow: hidden;
  justify-content: center;
  margin-left: 50;
  align-items: center;
  border: solid 1px ${colors.white};
`

export const styles = {
  RemoveIcon: {
    type: 'fe',
    name: 'x',
    size: 40,
    color: colors.white,
  },
  LinearGradient: {
    container: {
      start: { x: 0, y: 0 },
      end: { x: 1, y: 0 },
      colors: [colors.red, colors.brightRed],
      style: {
        flex: 1,
      },
    },
  },
}
