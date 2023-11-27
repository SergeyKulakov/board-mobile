import styled from 'styled-components/native'
import { isIphoneX, isIos } from 'Helpers/iphoneX'
import { colors } from 'Themes'

export const Wrapper = styled.View`
  position: relative;
  flex: 1;
`

export const Container = styled.ScrollView`
  position: absolute;
  flex-direction: column;
  padding-top: ${isIphoneX() ? 40 : 20};
  background-color: ${colors.zircon};
  flex: 1;
  top: 0;
  left: 0;
  width: 100%;
`

export const ListContainer = styled.View`
  margin-top: 20;
  flex: 1;
  margin-bottom: ${isIos() ? 20 : 40};
`

export const LogOutText = styled.Text`
  font-size: 18;
  color: ${colors.disabledGray};
  padding-left: 20;
  padding-top: 20;
  padding-bottom: 30;
`
