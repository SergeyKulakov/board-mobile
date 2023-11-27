import styled from 'styled-components/native'
import { colors } from 'Themes'

const theme = {
  colors: {
    Title: colors.black,
    SubTitle: colors.lightGray,
    PremiumText: colors.white,
    PremiumTextContainer: colors.blue,
  },
}

export const Container = styled.View`
  margin-top: 10;
  margin-bottom: 10;
  flex-direction: row;
`

export const AvatarContainer = styled.View`
  margin-right: 3%;
  border-radius: 40;
  overflow: hidden;
  width: 70;
  height: 70;
  justify-content: center;
  align-items: center;
  ${p => p.isHasntAvatar && `border: solid 1px ${colors.blue}`};
`

export const Avatar = styled.Image.attrs(props => ({
  resizeMode: 'cover',
  source: { uri: props.url },
}))`
  width: 100%;
  height: 100%;
`

export const Block = styled.View`
  flex-direction: column;
  max-width: 60%;
`

export const Title = styled.Text`
  font-size: 17;
  color: ${theme.colors.Title};
  font-weight: bold;
  margin-bottom: 2;
`

export const SubTitle = styled.Text.attrs(() => ({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
}))`
  font-size: 16;
  color: ${theme.colors.SubTitle};
`

export const PremiumTextContainer = styled.View`
  margin-top: 7;
  flex-direction: row;
  justify-content: center;
  border-radius: 20;
  padding-vertical: 5;
  background-color: ${theme.colors.PremiumTextContainer};
`

export const Wrapper = styled.View`
  flex-direction: column;
  padding-horizontal: 10;
`

export const PremiumText = styled.Text`
  font-size: 16;
  color: ${theme.colors.PremiumText};
  font-weight: bold;
  text-align: center;
  max-width: 90%;
`

export const styles = {
  Icon: {
    name: 'user',
    size: 40,
    color: colors.blue,
  },
}
