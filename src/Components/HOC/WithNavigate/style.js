import styled from 'styled-components/native'
import { CustomElements } from 'Themes'

export const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
`

export const styles = {
  ToastSuccess: CustomElements.getToastStyle(true),
  ToastError: CustomElements.getToastStyle(),
}
