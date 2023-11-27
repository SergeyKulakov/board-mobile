import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'
import DeviceInfo from 'react-native-device-info'

export const Container = styled.View`
  padding-top: 25;
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 30;
  background-color: ${colors.white};
  border-radius: 10;
  box-shadow: 0 0 5px ${colors.disabledGray};
  elevation: 10;
  ${DeviceInfo.isTablet() && `max-width: ${metrics.screenWidth - 30}`}
  margin-bottom: 20;
  width: 100%;
`

export const Title = styled.Text`
  font-weight: bold;
  font-size: 18;
  color: ${colors.black};
  max-width: 70%;
`
