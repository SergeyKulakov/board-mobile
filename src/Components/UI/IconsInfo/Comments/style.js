import styled from 'styled-components/native'
import { colors } from 'Themes'

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`

export const CountText = styled.Text`
  font-size: 16;
  color: ${colors.textGray};
  margin-left: 5;
`

export const styles = {
  CommentsIcon: {
    name: 'commenting',
    size: 15,
    color: colors.jade,
  },
}
