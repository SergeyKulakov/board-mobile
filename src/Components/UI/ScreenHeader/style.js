import styled from 'styled-components/native'
import { isIphoneX, isIos } from 'Helpers/iphoneX'
import { colors } from 'Themes'
import { width } from 'styled-system'

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Container = styled.View`
  flex-direction: column;
  padding-top: ${isIphoneX() ? 40 : isIos() ? 15 : 5};
  padding-left: 4%;
  padding-bottom: 5;
  padding-right: 4%;
`

export const SearchContainer = styled.View`
  margin-top: 20;
  padding-bottom: 15;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 500;
`

export const Title = styled.Text`
  font-size: 20;
  color: ${colors.white};
  font-weight: bold;
`

export const HumburgerContainer = styled.View`
  flex-direction: column;
  justify-content: space-between;
  height: 25;
  width: 30;
`

export const HumburgerLine = styled.View`
  ${width};
  height: 4;
  border-radius: 2;
  background-color: ${colors.white};
`

export const styles = {
  Icon: {
    name: 'angle-left',
    size: 30,
    color: colors.white,
  },
}
