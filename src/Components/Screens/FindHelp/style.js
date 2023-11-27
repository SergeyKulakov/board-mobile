import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'
import { Icon as UIIcon } from 'Components/UI'

export const Container = styled.View`
  flex: 1;
`

export const BannerWrapper = styled.View`
  height: 60;
`

export const ProviderProfileCardWrapper = styled.View`
  background-color: #fff;
  padding-top: 5;
  padding-bottom: 5;
  padding-left: 5;
  padding-right: 5;
  position: relative;
  flex: 1;
`

export const RemoveButton = styled(UIIcon).attrs(props => ({
  name: 'times',
  color: colors.black,
}))`
  position: absolute;
  top: 5;
  right: 15;
`
