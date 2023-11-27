import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Container = styled.View``

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-left: 5%;
  padding-right: 5%;
`

export const Link = styled.Text`
  font-size: 16;
  color: ${colors.blue};
`

export const styles = {
  BoxShadow: {
    paddingLeft: 0,
    paddingRight: 0,
    marginBottom: 0,
  },
}
