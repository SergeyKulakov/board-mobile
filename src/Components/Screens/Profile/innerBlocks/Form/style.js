import styled from 'styled-components/native'
import { isIphoneX } from 'Helpers/iphoneX'

export const Block = styled.View`
  justify-content: center;
  width: 100%;
`

export const ButtonContainer = styled.View`
  width: 100%;
`

export const FormBlock = styled.ScrollView`
  flex-direction: column;
`
export const GeneralInfoContainer = styled.View`
  margin-bottom: 30;
  padding-left: 2%;
  padding-right: 2%;
  max-width: 500;
  margin-right: auto;
  margin-left: auto;
`

export const styles = {
  button: {
    container: {
      paddingBottom: isIphoneX() ? 30 : 20,
    },
  },
}
