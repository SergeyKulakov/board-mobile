import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'
import { space } from 'styled-system'

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
`

export const BigImageContainer = styled.View`
  width: 60%;
  height: 123;
  border-radius: 10;
  overflow: hidden;
`

export const ImageContainer = styled.View`
  width: 60;
  height: 60;
  border-radius: 10;
  overflow: hidden;
  ${space};
`

export const ImagesColumn = styled.View`
  flex-direction: column;
  margin-left: 3;
`

export const MoreContainer = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.lightGray04};
`

export const MoreText = styled.Text`
  font-size: 22;
  color: ${colors.white};
  text-align: center;
  font-weight: bold;
`
