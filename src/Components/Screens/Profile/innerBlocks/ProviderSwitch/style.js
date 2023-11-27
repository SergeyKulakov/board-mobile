import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Title = styled.Text`
  font-size: 20;
  color: ${colors.blue};
  font-weight: bold;
  max-width: 80%;
`

export const switchStyle = {
  transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
}
