import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'

export const Container = styled.View`
  flex: 1;
  padding-top: 15;
  padding-left: 5;
  padding-right: 5;
  padding-bottom: 15;
`

export const Header = styled.TouchableWithoutFeedback`
  padding-bottom: 5;
  margin-bottom: 5;
  padding-left: 5;
`

export const HeaderText = styled.Text`
  font-size: 18;
  color: ${colors.black};
  font-weight: bold;
`

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
`

export const AvatarContainer = styled.View`
  overflow: hidden;
  height: 90;
  width: 90;
  border-radius: 45;
  margin-right: 30;
  align-items: center;
  justify-content: center;
  background-color: ${colors.disabledGray};
`

export const InfoContainer = styled.View`
  flex-direction: column;
`

export const NameContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

export const NameText = styled.Text.attrs(props => ({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}))`
  font-size: 16;
  color: ${colors.black};
  margin-right: 10;
  font-weight: bold;
`

export const SubNameContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

export const StarsIconWrapper = styled.View`
  padding-right: 5;
`

export const ReviewsTextWrapper = styled.TouchableOpacity`
  border: solid 0 ${colors.textGray};
  border-left-width: 2;
`

export const ReviewsText = styled.Text`
  padding-top: 2;
  padding-bottom: 2;
  padding-left: 5;
  font-size: 15;
  font-weight: bold;
  color: ${colors.blue};
`

export const OtherText = styled.Text`
  margin-top: 5;
  font-size: 16;
  color: ${colors.blue};
  max-width: 90%;
`

export const styles = {
  DefaultAvatar: {
    name: 'user',
    size: 45,
    color: colors.white,
  },
}
