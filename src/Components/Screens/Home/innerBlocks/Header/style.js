import styled from 'styled-components/native'
import { colors } from 'Themes'
import { flex, justifyContent } from 'styled-system'

export const Container = styled.View`
  flex-direction: row;
  padding-top: 10;
  padding-left: 10;
  padding-right: 10;
  align-items: center;
`

export const Block = styled.View`
  flex-direction: row;
  align-items: center;
  ${flex};
  ${justifyContent};
`

export const AvatarContainer = styled.View`
  width: 40;
  height: 40;
  border-radius: 20;
  overflow: hidden;
  align-self: flex-end;
`

export const Avatar = styled.ImageBackground.attrs(props => ({
  source: { uri: props.src },
  resizeMode: 'cover',
}))`
  width: 100%;
  height: 100%;
`

export const DefaultAvatarBlock = styled.View`
  width: 40;
  height: 40;
  border-radius: 50;
  border: solid 1px ${colors.white};
  justify-content: center;
  align-items: center;
  align-self: flex-end;
`

export const Points = styled.Text`
  font-size: 16;
  color: #fff;
  margin-right: 10;
`

export const styles = {
  Title: {
    fontSize: 35,
    textAlign: 'center',
  },
  ActivityIndicator: {},
  Icon: {
    name: 'user',
    size: 20,
    color: colors.white,
  },
  Image: {
    resizeMode: 'cover',
    loaderStyle: {
      color: colors.white,
    },
  },
}
