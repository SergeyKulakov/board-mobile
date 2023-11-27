import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'

export const Container = styled.View`
  flex: 1;
`

export const ButtonContainer = styled.View`
  flex: 1;
`

export const styles = {
  Modal: {
    width: metrics.widthPercentageToDP(90),
  },
  Button: {
    container: {
      flex: 1,
    },
  },
  ButtonCancel: {
    bgColor: colors.disabledGray,
  },
}
