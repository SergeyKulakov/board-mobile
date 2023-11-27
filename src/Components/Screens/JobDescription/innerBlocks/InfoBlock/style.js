import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'

export const Wrapper = styled.View`
  padding-left: 5;
  padding-right: 5;
  flex: 1;
  flex-direction: column;
`

export const Footer = styled.View`
  margin-top: 10;
  flex-direction: column;
  min-height: 120;
`

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Content = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`

export const InfoColumn = styled.View`
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`

export const InfoContainer = styled.View`
  flex-direction: column;
  margin-top: 5;
  margin-bottom: 5;
`

export const Label = styled.Text.attrs(props => ({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}))`
  font-size: 16;
  color: ${colors.black};
  font-weight: bold;
  margin-bottom: 7;
`

export const Text = styled.Text`
  font-size: 14;
  color: ${colors.textGray};
`

export const TextLink = styled(Text)`
  margin-top: 15;
  color: ${colors.blue};
  margin-bottom: 10;
`

export const styles = {
  ChatIcon: {
    type: 'ant',
    name: 'wechat',
    size: 40,
    color: colors.white,
  },
}
