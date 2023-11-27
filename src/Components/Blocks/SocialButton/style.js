import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'
import _ from 'lodash'

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  width: 60;
  height: 60;
  border-radius: 40;
  background-color: ${p => p.bg || colors.facebook};
`

export const styles = {
  getIcon: props => {
    if (_.isString(props)) {
      return {
        name: props,
        size: 25,
        color: colors.white,
      }
    }
    return {
      type: props.type || 'fa',
      name: props.name,
      size: props.size || 25,
      color: props.color || colors.white,
    }
  },
  ActivityIndicator: {
    size: 'small',
    color: colors.white,
  },
}
