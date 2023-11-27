import styled from 'styled-components/native/dist/styled-components.native.esm'
import { colors } from 'Themes'

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  width: 90%;
  max-width: 500;
  margin-top: 10;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0;
`

export const styles = {
  SocialButton: {
    facebook: {
      color: colors.facebook,
      icon: 'facebook-f',
    },
    google: {
      icon: 'google',
      color: colors.gmail,
    },
    linkedIn: {
      icon: 'linkedin',
      color: colors.linkedIn,
    },
  },
}
