import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Container = styled.View``

export const UploadImageBlock = styled.View`
  position: relative;
`

export const IconContainer = styled.View`
  border-radius: 40;
  position: absolute;
  justify-content: center;
  align-items: center;
  bottom: 5;
  right: 5;
  padding-top: 10;
  padding-bottom: 10;
  padding-left: 10;
  padding-right: 10;
  background-color: ${colors.blue};
`

export const ImageContainer = styled.View`
  overflow: hidden;
`

export const styles = {
  ActivityIndicator: {
    size: 'small',
    color: colors.white,
  },
}
