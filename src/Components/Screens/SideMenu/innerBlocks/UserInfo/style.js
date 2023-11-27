import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'

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
  padding-right: 2%;
  flex-direction: row;
  padding-left: 4%;
  width: 300;
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
`

export const Title = styled.Text`
  font-size: 17;
  color: ${theme.colors.Title};
  font-weight: bold;
  margin-bottom: 2;
  width: 190;
`

export const SubTitle = styled.Text`
  font-size: 16;
  color: ${theme.colors.SubTitle};
`

export const PremiumTextContainer = styled.View`
  margin-top: 7;
  flex-direction: row;
  justify-content: center;
  width: 190;
  border-radius: 20;
  background-color: ${theme.colors.PremiumTextContainer};
`

export const PremiumText = styled.Text`
  font-size: 16;
  color: ${theme.colors.PremiumText};
  font-weight: bold;
  text-align: center;
`

export const styles = {
  Icon: {
    name: 'user',
    size: 40,
    color: colors.blue,
  },
}
