import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'

export const Title = styled.Text`
  font-size: 20;
  color: ${colors.red};
  margin-bottom: 10;
`

export const Container = styled.View`
  flex: 1;
  max-width: 500;
  margin: 0 auto;
  min-width: ${metrics.screenWidth - 30};
  width: 100%;
`

export const ImageWrapper = styled.TouchableOpacity`
  flex: 1;
`
