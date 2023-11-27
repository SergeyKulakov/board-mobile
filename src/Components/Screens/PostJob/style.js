import styled from 'styled-components/native'
import { colors } from 'Themes'
import { space } from 'styled-system'

export const Container = styled.View`
  flex: 1;
`

export const Block = styled.View`
  ${space};
  width: 100%;
  align-items: center;
`

export const Content = styled.View`
  flex: 1;
`

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: ${p => p.height};
  max-height: ${p => p.height};
`

export const styles = {
  CancelButton: {
    fieldStyle: {
      width: '100%',
      height: '100%',
      maxWidth: '40%',
    },
    linear: true,
    gradientStyle: {
      flex: 1,
    },
    container: {
      flex: 1,
    },
    style: {
      gradient: {
        start: colors.addServiceBtn.disabled.start,
        end: colors.addServiceBtn.disabled.end,
      },
    },
  },
  SaveButton: {
    fieldStyle: {
      width: '100%',
      height: '100%',
      maxWidth: '60%',
    },
    gradientStyle: {
      flex: 1,
      paddingRight: 10,
      paddingLeft: 10,
    },
    container: {
      flex: 1,
    },
    textStyle: {
      flex: 1,
    },
    linear: true,
  },
  FirstShadowBox: {
    marginTop: 10,
  },
}
