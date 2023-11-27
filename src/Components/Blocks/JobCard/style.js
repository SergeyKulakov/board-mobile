import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'
import { isIos } from 'Helpers/iphoneX'
import { flex, space, width, minWidth } from 'styled-system'
import { Icon } from 'Components/UI'

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  ${isIos() && 'margin-bottom: -5'};
`

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-right: 10;
  padding-left: 10;
  padding-top: 10;
  margin-bottom: 5;
  max-width: ${metrics.screenWidth - 10};
  ${isIos() && 'z-index: 2'};
`

export const Title = styled.Text.attrs(() => ({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
}))`
  font-size: 18;
  color: ${colors.black};
  font-weight: bold;
  padding-top: 10;
  max-width: ${p => metrics.screenWidth - (p.maxWidth + 20)};
`

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  overflow: hidden;
`

export const Row = styled.View`
  flex-direction: row;
  align-items: ${p => (p.alignStart ? 'flex-start' : 'center')};
  ${space};
  ${flex};
  ${width};
`

export const Content = styled.View``

export const ImageContainer = styled.View`
  justify-content: center;
  align-items: center;
  border-radius: 10;
  width: 100;
  height: 100;
  background-color: ${colors.blue};
  margin-right: 10;
  margin-left: 2%;
`

export const DateText = styled.Text`
  font-size: 18;
  color: ${colors.black};
  margin-left: 7;
  font-weight: bold;
  max-width: 70%;
`

export const Description = styled.Text.attrs(() => ({
  numberOfLines: 3,
  ellipsizeMode: 'tail',
}))`
  font-size: 17;
  margin-bottom: 5;
  color: ${colors.textGray};
  max-width: 80%;
`

export const InfoBlock = styled.View`
  flex-direction: column;
  align-self: flex-start;
`

export const BottomContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 5;
  padding-bottom: 5;
`

export const BudgetText = styled.Text`
  font-size: 20;
  color: ${colors.white};
  font-weight: bold;
  text-align: center;
`

export const BudgetContainer = styled.View`
  justify-content: center;
  margin-left: 100;
  flex: 1;
`

export const DistanceContainer = styled.View`
  left: 10;
  min-width: 100;
  justify-content: center;
  align-items: center;
  position: absolute;
`

export const DistanceBlock = styled.View`
  padding-left: 5;
  padding-right: 10;
  padding-top: 3;
  padding-bottom: 3;
  border-radius: 25;
  flex-direction: row;
  align-items: center;
`

export const RightHeaderBlock = styled.View`
  flex-direction: row;
  ${isIos() && 'z-index: 4'};
  ${minWidth}
`

export const HeartIcon = styled.View`
  margin-top: -5;
`

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10;
  position: relative;
`

export const RemoveIcon = styled(Icon).attrs(() => ({
  name: 'times',
  color: colors.textGray,
  size: 15,
}))`
  margin-left: 10;
  margin-top: -5;
`

export const MoreWrapper = styled.View`
  position: relative;
  min-width: 40;
  justify-content: center;
  align-items: center;
`

export const CancelButton = styled.Text`
  font-size: 14;
  color: ${colors.textGray};
  font-weight: bold;
  margin-right: 5;
`

export const CircleButtonContainer = styled.TouchableOpacity`
  ${p => p.isLarge && `margin-right: 4; margin-left: 4;`}
`

export const styles = {
  Title: {
    fontSize: 18,
  },
  Image: {
    withLoading: true,
    resizeMode: 'cover',
  },
  DistanceGradient: {
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
    style: {
      borderRadius: 25,
    },
    colors: [colors.zircon, colors.athensGray, colors.zircon],
  },
  DistanceIcon: {
    textStyle: {
      color: colors.black,
    },
  },
  CalendarIcon: {
    name: 'calendar',
    size: 15,
    color: colors.blue,
    style: {
      paddingTop: 5,
    },
  },
  Button: {
    container: {
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 20,
      paddingRight: 20,
      maxWidth: 200,
    },
  },
  HeartIcon: {
    name: 'heart',
    size: 15,
    color: colors.red,
  },
  JobDefaultIcon: {
    type: 'mi',
    name: 'work',
    size: 55,
    color: colors.white,
  },
  BudgetGradient: {
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
    style: {
      flex: 1,
    },
    colors: [colors.gradientEnd, colors.gradientStart, colors.gradientEnd],
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
