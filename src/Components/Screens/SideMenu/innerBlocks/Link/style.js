import styled from 'styled-components/native'
import _ from 'lodash'
import { colors, metrics } from 'Themes'

export const Container = styled.View`
  padding-left: 20;
  padding-top: 20;
  padding-bottom: 20;
  flex-direction: row;
  ${p => p.disabled && 'opacity: 0.5'};
`

export const Text = styled.Text`
  color: ${p => (p.isActive ? colors.blue : colors.textGray)};
  font-size: 18;
  margin-left: 4%;
`

export const styles = {
  GradientContainer: {
    gradient: {
      start: colors.sidebar.gradient.start,
      end: colors.sidebar.gradient.end,
    },
    style: {},
  },
}
