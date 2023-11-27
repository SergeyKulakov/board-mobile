import styled from 'styled-components/native'
import { colors, metrics } from 'Themes'

export const ListContainer = styled.View`
  margin-top: 5;
`

export const ButtonContainer = styled.View`
  margin-top: 30;
  padding-bottom: 10;
`

export const InputContainer = styled.View`
  margin-top: 10;
`

export const addServicesBtnStyle = {
  gradient: {
    start: colors.addServiceBtn.start,
    end: colors.addServiceBtn.end,
  },
  color: colors.textGray,
}
