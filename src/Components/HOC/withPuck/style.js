import styled from 'styled-components/native'
import { colors } from 'Themes'
import * as Animatable from 'react-native-animatable'

export const Container = styled(Animatable.View).attrs(() => ({
  animation: 'fadeIn',
}))`
  flex: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding-left: 10;
  padding-right: 10;
  z-index: 9999;
  background-color: ${colors.lightGray04};
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const ImageWrapper = styled(Animatable.View).attrs(() => ({
  animation: 'bounceIn',
}))`
  justify-content: center;
  align-items: center;
`

export const Image = styled.Image.attrs(({ image }) => ({
  source: image,
}))`
  width: 120;
  height: 120;
  max-width: 70%;
`

export const MessageWrapper = styled.View`
  margin-top: 10;
  padding-top: 5;
  padding-left: 10;
  padding-right: 10;
  padding-bottom: 5;
  border-radius: 10;
  background-color: ${colors.lightGray};
`

export const Message = styled.Text`
  font-size: 22;
  color: ${colors.white};
  font-weight: bold;
  text-align: center;
`

export const ButtonsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10;
  flex-wrap: wrap;
  justify-content: center;
`

const ButtonWrapper = styled.TouchableOpacity`
  padding-vertical: 10;
  padding-horizontal: 15;
  border-radius: 7;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const CancelButton = styled(ButtonWrapper)`
  border: solid 1px #fff;
`

export const SubmitButton = styled(ButtonWrapper)`
  background-color: ${colors.blue};
`

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 18;
  text-align: center;
  font-weight: bold;
`
