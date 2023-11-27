import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'
import { isIphoneX } from 'Helpers/iphoneX'

export const Container = styled.View`
  flex: 1;
`

export const styles = {
  button: {
    container: {
      paddingBottom: isIphoneX() ? 40 : 20,
    },
  },
}
