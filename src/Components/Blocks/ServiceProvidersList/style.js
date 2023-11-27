import styled from 'styled-components/native'
import { space, minHeight } from 'styled-system'
import { colors } from 'Themes'
import * as Animatable from 'react-native-animatable'
import { Platform } from 'react-native'

export const Container = styled.View`
  flex: 1;
`

export const Block = styled.View`
  ${space};
  ${minHeight};
`

export const AnimateView = styled(Animatable.View)`
  flex: 1;
`

export const AnimateRowView = styled(Animatable.View)`
  min-height: ${Platform.select({ ios: 215, android: 220 })};
`

export const RemoveCardActionWrapper = styled.View`
  margin-top: 5;
  margin-bottom: 5;
  flex: 1;
`

export const CardWrapper = styled.View`
  padding-top: 5;
  padding-bottom: 5;
`

export const ProviderProfileCardWrapper = styled.View`
  padding-bottom: 10;
  box-shadow: 0 0 10px ${colors.disabledGray};
  elevation: 7;
  padding-top: 10;
  padding-right: 10;
  padding-left: 10;
  min-height: ${p => (p.isBig ? 250 : 350)};
  background-color: #fff;
`
