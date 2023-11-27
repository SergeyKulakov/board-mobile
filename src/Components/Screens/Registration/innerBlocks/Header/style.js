import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'
import { flex } from 'styled-system'

export const Container = styled.View`
  flex-direction: row;
  padding-top: 5;
  padding-bottom: 5;
  align-items: center;
`

export const Block = styled.View`
  flex: 1;
  ${flex};
`

export const styles = {
  Icon: {
    name: 'angle-left',
    size: 40,
    color: colors.white,
  },
  Title: {
    textAlign: 'center',
  },
}
