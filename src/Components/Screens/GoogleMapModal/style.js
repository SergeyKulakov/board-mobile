import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'
import { space, flex } from 'styled-system'

export const Container = styled.View`
  flex: 1;
`

export const HeaderBlock = styled.View`
  flex: 1;
  ${flex};
  ${space};
`

export const Content = styled.View`
  flex: 1;
`

export const styles = {
  ScreenTitle: {
    textAlign: 'center',
  },
  MapView: {
    flex: 1,
  },
}
