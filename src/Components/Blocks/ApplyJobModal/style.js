import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Container = styled.View`
  flex: 1;
`

export const Title = styled.Text`
  width: 100%;
  text-align: center;
  font-size: 20;
  color: ${colors.black};
  font-weight: bold;
`

export const ButtonBlock = styled.View`
  flex-direction: row;
  justify-content: center;
  border-bottom-left-radius: 5;
  border-bottom-right-radius: 5;
  margin-bottom: -2;
  overflow: hidden;
`

export const LoaderContainer = styled.View`
  padding-bottom: 20;
`

export const TitleWrapper = styled.View`
  padding-top: 15;
  padding-bottom: 30;
  margin-bottom: 30;
  width: 100%;
  border: solid 0 ${colors.athensGray};
  border-bottom-width: 1;
`

export const styles = {
  SkipButton: {
    fieldStyle: {
      flex: 1,
    },
    gradientStyle: {
      flex: 1,
    },
    linear: true,
    style: {
      gradient: {
        start: colors.disabledGray,
        end: colors.frenchGray,
      },
      container: {
        borderBottomLeftRadius: 10,
      },
    },
  },
  ApplyButton: {
    style: {
      container: {
        borderBottomRightRadius: 10,
      },
    },
    linear: true,
    gradientStyle: {
      flex: 1,
    },
    fieldStyle: {
      flex: 1,
    },
  },
  Loader: {
    size: 'small',
    color: colors.blue,
  },
}
