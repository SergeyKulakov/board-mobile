import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'

export const Container = styled.View`
  flex: 1;
  position: relative;
`

export const Text = styled.Text`
  text-align: center;
  color: ${colors.white};
`

export const Title = styled(Text)`
  margin-top: 15;
  font-size: 18;
  font-weight: bold;
`

export const SubTitle = styled(Text)`
  font-size: 16;
  padding-top: 5;
`

export const ImageBlock = styled.View`
  justify-content: center;
  flex: 1;
`

export const Image = styled.Image`
  width: ${metrics.screenWidth - 80};
  max-width: 500;
  margin-left: auto;
  margin-right: auto;
`

export const InfoBlock = styled.View`
  width: 100%;
  justify-content: center;
  margin-bottom: 20;
  padding-right: 4%;
  padding-left: 4%;
`
