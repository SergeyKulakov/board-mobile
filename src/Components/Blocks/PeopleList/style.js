import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'
import { isIos } from 'Helpers/iphoneX'

export const Container = styled.View`
  flex: 1;
`

export const Content = styled.View`
  ${!isIos() && 'padding-bottom: 10'};
`

export const PhotoContainer = styled.View`
  margin-right: 10;
  margin-bottom: 5;
`

export const TitleWrapper = styled.View`
  max-width: ${p => metrics.screenWidth - p.width};
  flex: 1;
`

export const Text = styled.Text`
  font-size: 14;
  margin-top: 10;
  color: ${colors.black};
  font-weight: bold;
`

export const ProviderContainer = styled.View`
  flex-direction: column;
  padding-top: 20;
  padding-left: 5;
  padding-right: 5;
`

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-left: 10;
  padding-right: 5%;
`

export const Link = styled.Text`
  font-size: 16;
  color: ${colors.blue};
`

export const styles = {
  List: {
    paddingBottom: 20,
  },
  IconAvatar: {
    name: 'user',
    size: 45,
    color: colors.white,
  },
}
