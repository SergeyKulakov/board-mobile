import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'
import { space } from 'styled-system'

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
`

export const SubHeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-top: 5;
`

export const ServicesContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-right: 10;
  border-radius: 10;
  padding-left: 10;
  padding-right: 10;
  background-color: ${colors.amber};
`

export const ServiceText = styled.Text`
  font-size: 15;
  color: ${colors.white};
  font-weight: bold;
`

export const ImagesContainer = styled.View`
  display: ${p => p.isBig? 'flex' : 'none'};
  flex-direction: row;
  box-shadow: 0 0 10px ${colors.frenchGray};
  elevation: 10;
  margin-top: 10;
  min-height: 120;
`

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 5;
`

export const AboutUs = styled.Text.attrs(() => ({
  numberOfLines: 2,
  ellipsizeMode: 'tail',
}))`
  font-size: 16;
  color: ${colors.black};
  max-width: ${p => metrics.screenWidth - (p.maxWidth + 20)};
`

export const ButtonsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

export const CircleButtonContainer = styled.View`
  ${space};
`

export const HireButtonWrapper = styled.View`
  margin-top: ${p => p.isBig? 0 : 20};
`

export const styles = {
  HireButton: {
    container: {
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 20,
      paddingRight: 20,
    },
  },
  CircleButton: {
    radius: 45,
  },
  getHeartIcon: isActive => ({
    name: isActive ? 'heart' : 'heart-o',
    color: isActive ? colors.red : colors.white,
    loaderColor: colors.white,
  }),
  SharedIcon: {
    type: 'fe',
    name: 'send',
    color: colors.white,
  },
}
