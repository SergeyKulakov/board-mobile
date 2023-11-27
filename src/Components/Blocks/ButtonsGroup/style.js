import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'

export const Container = styled.View`
  flex-direction: row;
  width: 100%;
  ${p => p.wrapperHeight && `min-height: ${p.wrapperHeight}`};
`

export const styles = {
  SubmitButton: {
    linear: true,
    fieldStyle: { maxWidth: '60%', width: '100%' },
    gradientStyle: { flex: 1 },
    style: { container: { paddingLeft: 15, paddingRight: 15 } },
  },
  CancelButton: {
    linear: true,
    style: {
      gradient: {
        start: colors.addServiceBtn.start,
        end: colors.addServiceBtn.end,
      },
      container: {},
      color: colors.black,
    },
    fieldStyle: { maxWidth: '40%', width: '100%', height: '100%' },
    gradientStyle: { flex: 1 },
  },
}
