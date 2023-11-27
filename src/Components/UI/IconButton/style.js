import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Container = styled.TouchableOpacity`
  box-shadow: 0 0 10px ${colors.frenchGray};
  elevation: 10;
`

export const styles = {
  getLinearGradientStyle: radius => ({
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
    style: {
      width: radius || 60,
      height: radius || 60,
      borderRadius: radius / 2 || 30,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
    },
    colors: [colors.gradientStart, colors.gradientEnd],
  }),
  getLoaderStyle: (props = {}) => ({
    size: props.size || 'small',
    color: props.color || colors.white,
  }),
}
