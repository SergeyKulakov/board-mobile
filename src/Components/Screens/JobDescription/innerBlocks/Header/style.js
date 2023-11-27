import styled from 'styled-components/native'
import { colors } from 'Themes'
import { space, flex } from 'styled-system'
import { isIos } from 'Helpers/iphoneX'
import { HeartIcon as UIHeartIcon } from 'Components/UI'

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding-bottom: 5;
`

export const Block = styled.View`
  flex: 1;
  ${space};
  ${flex};
  align-items: center;
  ${isIos() && 'padding-top: 5'};
`

export const LeftButtonsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 2;
`

export const RightButtonsWrapper = styled(LeftButtonsWrapper)`
  justify-content: flex-end;
  align-items: center;
`

export const BackIconWrapper = styled.View`
  margin-right: 15;
`

export const TitleColumn = styled.View`
  flex-direction: column;
  padding-left: 5;
`

export const TitleRow = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Title = styled.Text.attrs(props => ({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}))`
  font-size: 20;
  color: ${colors.white};
  margin-top: 5;
  font-weight: bold;
`

export const SubTitle = styled.Text`
  font-size: 15;
  color: ${colors.white};
  opacity: 0.7;
`

export const CrownCircle = styled.View`
  width: 40;
  height: 40;
  border-radius: 20;
  overflow: hidden;
  background-color: ${colors.amber};
  flex-direction: column;
  align-items: center;
  margin-left: 10;
`

export const HeartIcon = styled(UIHeartIcon)`
  margin-right: 15;
`

export const PostedActionsView = styled.View`
  margin-left: 25;
`

export const styles = {
  CrownIcon: {
    type: 'mci',
    name: 'crown',
    size: 15,
    color: colors.white,
  },
  ShareIcon: {
    type: 'fe',
    name: 'send',
    size: 20,
    color: colors.white,
  },
  getHeartIcon: isActive => ({
    name: isActive ? 'heart' : 'heart-o',
    size: 20,
    color: isActive ? colors.red : colors.white,
  }),
}
