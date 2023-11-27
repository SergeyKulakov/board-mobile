import styled from 'styled-components/native'
import _ from 'lodash'
import { colors } from 'Themes'

export const Text = styled.Text`
  font-size: 18;
  text-align: center;
  color: ${p => (p.disabled ? colors.textGray : p.color || colors.white)};
  font-weight: bold;
  opacity: ${p => (p.disabled ? 0.6 : 1)};
`

export const getContainerStyle = isLinear => {
  const style = {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  }

  if (_.isBoolean(isLinear)) {
    style.borderRadius = 0
  } else if (_.isNumber(isLinear)) {
    style.borderRadius = isLinear
  }

  return style
}

export const IconBlock = styled.View`
  margin-${p => (p.align === 'after' ? 'left' : 'right')}: 3%;
`

export const Container = styled.View`
  flex-direction: row;
  padding-top: 15;
  padding-bottom: 15;
  align-items: center;
`

export const ColoredContainer = styled.View`
  background: ${p => p.bgColor};
`

export const styles = {
  ActivityIndicator: {
    color: colors.white,
  },
}
