import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Container = styled.View`
  flex-direction: column;
  margin-top: 10;
`

export const Loader = styled.ActivityIndicator.attrs(() => ({
  size: 'large',
  color: colors.blue,
}))``

export const LoaderWrapper = styled.View`
  justify-content: center;
  align-items: center;
`

export const Title = styled.Text`
  font-weight: bold;
  font-size: 18;
  color: #000;
  margin-bottom: 15;
  text-transform: capitalize;
  padding-left: 5;
`

export const styles = {
  ShadowBox: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 10,
  },
}
