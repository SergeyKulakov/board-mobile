import styled from 'styled-components/native'
import { isIphoneX } from 'Helpers/iphoneX'

export const Container = styled.ScrollView`
  padding-top: 10%;
  padding-left: 4%;
  padding-right: 4%;
`

export const styles = {
  button: {
    container: {
      paddingBottom: isIphoneX() ? 40 : 20,
    },
  },
}
