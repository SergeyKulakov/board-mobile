import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`

export const Title = styled.Text`
  font-size: 16;
  color: ${colors.black};
`

export const ImageWrapper = styled.View`
  width: 30;
  height: 30;
  margin-right: 10;
`
