import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Container = styled.ImageBackground`
  flex: 1;
  width: 100%;
  height: 100%;
`

export const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const styles = {
  getActivityIndicator: style => ({
    size: style.size || 'small',
    color: style.color || colors.blue,
  }),
}
