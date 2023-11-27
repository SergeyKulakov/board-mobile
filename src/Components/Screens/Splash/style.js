import styled from 'styled-components/native'
import { colors } from 'Themes'
import { flex } from 'styled-system'
import LinearGradient from 'react-native-linear-gradient'
import { splashText } from 'Assets/images'

export const GradientContainer = styled(LinearGradient).attrs(() => ({
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
  colors: [colors.gradientStart, colors.gradientEnd],
}))`
  flex: 1;
`

export const Wrapper = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
`

export const Block = styled.View`
  flex: 1;
  ${flex};
`

export const SplashTextWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const SplashText = styled.Image.attrs(() => ({
  source: splashText,
  resizeMode: 'contain',
}))`
  width: 300;
`

export const LoaderWrapper = styled.View`
  padding-bottom: 30;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`
